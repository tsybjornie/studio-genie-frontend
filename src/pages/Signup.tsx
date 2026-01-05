import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { api, setToken } from "../lib/api";

export default function Signup() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirm_password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [hasPaidSubscription, setHasPaidSubscription] = useState(false);

    useEffect(() => {
        // Check if redirected from Stripe subscription checkout
        const sessionId = searchParams.get("session_id");
        if (sessionId) {
            setHasPaidSubscription(true);
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirm_password) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            // Get session_id from URL if present (from Stripe subscription redirect)
            const sessionId = searchParams.get("session_id");

            // Build request URL with session_id if available
            let url = "/auth/register";
            if (sessionId) {
                url += `?session_id=${sessionId}`;
            }

            const response = await api<{ access_token: string; token_type: string }>(url, {
                method: "POST",
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            // Save token
            const token = response.access_token;
            setToken(token);

            // Check subscription status via /users/me
            try {
                const userResponse = await fetch("https://studio-genie-backend.onrender.com/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    const subscriptionStatus = userData.subscription_status;

                    // Redirect based on subscription status
                    if (subscriptionStatus === "active") {
                        navigate("/dashboard");
                    } else {
                        navigate("/pricing?message=subscription_required");
                    }
                } else {
                    // If /users/me fails, redirect to pricing as fallback
                    navigate("/pricing?message=subscription_required");
                }
            } catch (userErr) {
                console.error("Failed to fetch user data:", userErr);
                // If /users/me fails, redirect to pricing as fallback
                navigate("/pricing?message=subscription_required");
            }
        } catch (err: any) {
            setError(err.response?.data?.detail || "Failed to create account");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black flex items-center justify-center px-6">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/">
                        <img src="/assets/logo.png" alt="Studio Genie" className="h-16 w-auto mx-auto mb-4" />
                    </Link>
                </div>

                {/* Signup Card */}
                <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
                    {hasPaidSubscription && (
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl">
                            <p className="text-green-400 text-sm text-center">✓ Payment successful! Complete registration to access your subscription.</p>
                        </div>
                    )}

                    <h1 className="section-heading text-white text-center mb-2">Create Account</h1>
                    <p className="text-center text-gray-400 mb-8 body-text">Join Studio Genie today</p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-white font-medium mb-2 dashboard-body">
                                Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="you@example.com"
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition body-text"
                            />
                        </div>

                        <div>
                            <label className="block text-white font-medium mb-2 dashboard-body">
                                Password
                            </label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition body-text"
                            />
                        </div>

                        <div>
                            <label className="block text-white font-medium mb-2 dashboard-body">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={formData.confirm_password}
                                onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition body-text"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-white text-black rounded-2xl font-medium hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Creating Account..." : "Sign Up"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-gray-400 dashboard-body">
                        Already have an account?{" "}
                        <Link to="/login" className="text-white hover:underline font-medium">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
