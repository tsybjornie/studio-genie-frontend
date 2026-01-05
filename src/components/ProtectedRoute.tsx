import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [loading, setLoading] = useState(true);
    const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        // Check subscription status
        const checkSubscription = async () => {
            try {
                const response = await fetch("https://studio-genie-backend.onrender.com/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        // Token expired
                        localStorage.removeItem("token");
                        setLoading(false);
                        return;
                    }
                    throw new Error("Failed to fetch user data");
                }

                const userData = await response.json();
                const subscriptionStatus = userData.subscription_status;

                setHasActiveSubscription(subscriptionStatus === "active");
                setLoading(false);
            } catch (error) {
                console.error("Subscription check failed:", error);
                setLoading(false);
            }
        };

        checkSubscription();
    }, [token]);

    // Show loading state while checking subscription
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    // Not logged in
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // No active subscription
    if (!hasActiveSubscription) {
        return <Navigate to="/app/pricing?message=subscription_required" replace />;
    }

    // Has active subscription
    return <>{children}</>;
}
