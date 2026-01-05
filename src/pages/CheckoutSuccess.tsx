import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CheckoutSuccess() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Force fresh /users/me fetch to rehydrate auth after Stripe redirect
        const refreshUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                // Fetch latest user data (subscription_status + credits)
                const response = await axios.get("https://studio-genie-backend.onrender.com/users/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log("[CHECKOUT SUCCESS] Fresh user data fetched:", response.data);

                // Wait 2 seconds to show success message, then redirect with refresh flag
                setTimeout(() => {
                    navigate("/dashboard?refresh=true");
                }, 2000);
            } catch (error) {
                console.error("Failed to refresh user data:", error);
                // Redirect anyway with refresh flag - dashboard will handle auth
                setTimeout(() => {
                    navigate("/dashboard?refresh=true");
                }, 2000);
            } finally {
                setLoading(false);
            }
        };

        refreshUserData();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-900 via-indigo-900 to-violet-800 flex items-center justify-center px-6">
            <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Payment Successful! 🎉
                </h1>
                <p className="text-gray-600 text-lg mb-8">
                    Your payment has been processed. {loading ? "Loading your dashboard..." : "Redirecting..."}
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="w-full px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition"
                    >
                        Go to Dashboard
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="w-full px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
                    >
                        Back to Home
                    </button>
                </div>

                <p className="mt-8 text-sm text-gray-500">
                    Refreshing your account data...
                </p>
            </div>
        </div>
    );
}
