import { useEffect, useState } from "react";
import { loadDashboard, saveDashboard } from "../lib/dashboardStore";
import Sidebar from "../components/Sidebar";
import DashboardHome from "../components/DashboardHome";
import DashboardProjects from "../components/DashboardProjects";
import DashboardCredits from "../components/DashboardCredits";
import DashboardSettings from "../components/DashboardSettings";

const buyCredits = async (pack: "small" | "medium" | "power") => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Not logged in");
            return;
        }

        const url = "https://studio-genie-backend.onrender.com/api/stripe/checkout/credits";

        // 🔍 DEBUG: Log exactly what we're calling
        console.log("=== BUY CREDITS DEBUG ===");
        console.log("URL:", url);
        console.log("Method: POST");
        console.log("Pack:", pack);
        console.log("Token:", token ? "present" : "missing");
        console.log("========================");

        // ✅ FIXED: Use absolute backend URL
        const res = await fetch(
            url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ packKey: pack }),
            }
        );

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.detail || "Checkout failed");
        }

        const data = await res.json();

        if (!data.url) {
            throw new Error("No checkout URL returned");
        }

        // Redirect to Stripe checkout (will redirect back to /dashboard/credits)
        window.location.href = data.url;
    } catch (err: any) {
        console.error("[CHECKOUT] Credit pack checkout failed:", err);
        alert(err.message || "Failed to start checkout");
    }
};

export default function Dashboard() {
    const [dashboard, setDashboard] = useState(loadDashboard());
    const [currentView, setCurrentView] = useState<'home' | 'projects' | 'credits' | 'settings'>('home');
    const [error, setError] = useState("");
    const [generating, setGenerating] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch user data and credits + SUBSCRIPTION CHECK
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    // STATE A: Not logged in
                    window.location.href = "/login";
                    return;
                }

                const res = await fetch(
                    "https://studio-genie-backend.onrender.com/users/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!res.ok) {
                    if (res.status === 401) {
                        // Token expired
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                        return;
                    }
                    if (res.status === 403) {
                        // STATE B: No active subscription
                        window.location.href = "/app/pricing?message=subscription_required";
                        return;
                    }
                    if (res.status === 404) {
                        // User not found - logout
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                        return;
                    }
                    throw new Error("Failed to fetch user data");
                }

                // STATE C: Active subscription
                const data = await res.json();
                console.log("[DASHBOARD] User data loaded:", data);

                // Set state with EXACT values from backend (NO fallbacks)
                setDashboard(prev => ({
                    ...prev,
                    credits: data.credits || 0,
                }));
                setUserEmail(data.email);  // Use exact email, NULL allowed
                setLoading(false);

                // Try to get username from localStorage
                const savedUsername = localStorage.getItem("username");
                if (savedUsername) {
                    setUserName(savedUsername);
                }
            } catch (err) {
                console.error("Failed to fetch user data:", err);
                // On error, clear token and redirect to login
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        };

        // Check if coming from checkout with refresh flag
        const params = new URLSearchParams(window.location.search);
        const shouldRefresh = params.get('refresh');

        if (shouldRefresh) {
            console.log("[DASHBOARD] Refresh flag detected - forcing immediate data reload");
            // Remove refresh flag from URL
            window.history.replaceState({}, '', '/dashboard');
        }

        fetchUserData();
    }, []); // Empty dependency - only run once on mount

    // Handle Stripe checkout redirects
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const checkoutStatus = params.get('checkout');

        if (checkoutStatus === 'success') {
            setCurrentView('credits');
            window.history.replaceState({}, '', '/dashboard');
            // Refetch credits after successful payment
            const refetchCredits = async () => {
                const token = localStorage.getItem("token");
                if (!token) return;
                const res = await fetch("https://studio-genie-backend.onrender.com/users/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setDashboard(prev => ({ ...prev, credits: data.credits || 0 }));
                }
            };
            refetchCredits();
        } else if (checkoutStatus === 'cancel') {
            setCurrentView('credits');
            window.history.replaceState({}, '', '/dashboard');
        }
    }, []);

    useEffect(() => {
        saveDashboard(dashboard);
    }, [dashboard]);

    const handleGenerateVideo = async (script: string, language: string) => {
        setError("");
        setGenerating(true);

        if (!script.trim()) {
            setError("Please enter a script");
            setGenerating(false);
            return;
        }

        if (dashboard.credits < 3) {
            setError("Not enough credits");
            setGenerating(false);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Not logged in");
                setGenerating(false);
                return;
            }

            const res = await fetch(
                `https://studio-genie-backend.onrender.com/video/generate?prompt=${encodeURIComponent(script)}&duration_seconds=15`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.detail || "Failed to generate video");
            }

            const data = await res.json();

            const newVideo = {
                id: data.job_id,
                text: script,
                language,
                createdAt: new Date().toISOString(),
                videoUrl: data.video_url,
                thumbnailUrl: data.thumbnail_url,
                duration: data.duration,
                status: data.status,
            };

            setDashboard({
                credits: data.credits_left,
                videos: dashboard.videos + 1,
                videoList: [newVideo, ...dashboard.videoList],
            });

            setError("");
        } catch (err: any) {
            console.error("Video generation error:", err);
            setError(err.message || "Failed to generate video");
        } finally {
            setGenerating(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "/login";
    };

    const handleBuyCredits = () => {
        setCurrentView('credits');
        setMobileMenuOpen(false);
    };

    const handleSaveUsername = (newUsername: string) => {
        setUserName(newUsername);
        localStorage.setItem("username", newUsername);
    };

    // Block render until user data is loaded (fixes TypeScript errors)
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    // Block render if email is null (ensures type safety)
    if (!userEmail) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return null;
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
            {/* Sidebar */}
            <Sidebar
                currentView={currentView}
                onNavigate={setCurrentView}
                userEmail={userEmail}
                userName={userName}
                userPlan="Pay-As-You-Go"
                onLogout={handleLogout}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />

            {/* Main Content */}
            <main className="flex-1 md:ml-60 p-6 md:p-10">
                {currentView === 'home' && (
                    <DashboardHome
                        dashboard={dashboard}
                        onBuyCredits={handleBuyCredits}
                        onGenerateVideo={handleGenerateVideo}
                        generating={generating}
                        error={error}
                    />
                )}

                {currentView === 'projects' && (
                    <DashboardProjects videoList={dashboard.videoList} />
                )}

                {currentView === 'credits' && (
                    <DashboardCredits
                        credits={dashboard.credits}
                        onBuyCredits={buyCredits}
                    />
                )}

                {currentView === 'settings' && (
                    <DashboardSettings
                        userEmail={userEmail}
                        userName={userName}
                        onSaveUsername={handleSaveUsername}
                    />
                )}
            </main>
        </div>
    );
}
