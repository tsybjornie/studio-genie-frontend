import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        // Optionally clear any checkout-related state
        // Could also call backend to verify payment status
    }, []);

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
                    Your subscription has been activated. Welcome to Studio Genie!
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
                    You should receive a confirmation email shortly.
                </p>
            </div>
        </div>
    );
}
