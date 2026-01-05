import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password,
            });

            const token = response.data.access_token;
            localStorage.setItem("token", token);

            // Check subscription status via /users/me
            try {
                const userResponse = await axios.get(`${API_URL}/users/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const subscriptionStatus = userResponse.data.subscription_status;

                // Redirect based on subscription status
                if (subscriptionStatus === "active") {
                    navigate("/dashboard");
                } else {
                    navigate("/app/pricing?message=subscription_required");
                }
            } catch (userErr: any) {
                console.error("Failed to fetch user data:", userErr);
                // If /users/me fails, redirect to pricing as fallback
                navigate("/app/pricing?message=subscription_required");
            }
        } catch (err: any) {
            setError(err.response?.data?.detail || "Login failed");
        } finally {
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

                {/* Login Card */}
                <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
                    <h1 className="section-heading text-white text-center mb-2">Welcome Back</h1>
                    <p className="text-center text-gray-400 mb-8 body-text">Log in to Studio Genie</p>

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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            {loading ? "Logging in..." : "Log In"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-gray-400 dashboard-body">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-white hover:underline font-medium">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
