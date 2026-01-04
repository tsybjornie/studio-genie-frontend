import { useState } from "react";

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-4">
                    Simple, Transparent Pricing
                </h2>
                <p className="text-center text-gray-600 text-lg mb-16">
                    Choose the plan that fits your creative needs
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <PricingCard
                        name="Starter"
                        price="$39"
                        period="/mo"
                        priceId="price_1SjjxCBBwifSvpdI963oyLLB"
                        features={[
                            { name: "4 AI-generated videos", included: true },
                            { name: "300+ AI creators", included: true },
                            { name: "35+ languages", included: true },
                            { name: "2-minute rendering", included: true },
                            { name: "Sora 2", included: true },
                            { name: "Bulk content generator", included: true },
                            { name: "B-roll generator", included: true },
                            { name: "Product-in-hand", included: false },
                            { name: "Video Agent", included: false }
                        ]}
                        cta="Choose Plan"
                    />

                    <PricingCard
                        name="Creator"
                        price="$79"
                        period="/mo"
                        priceId="price_1SjjxfBBwifSvpdIeWCEYEQY"
                        features={[
                            { name: "12 AI-generated videos", included: true },
                            { name: "300+ AI creators", included: true },
                            { name: "35+ languages", included: true },
                            { name: "2-minute rendering", included: true },
                            { name: "Sora 2", included: true },
                            { name: "Bulk content generator", included: true },
                            { name: "B-roll generator", included: true },
                            { name: "Product-in-hand", included: false },
                            { name: "Video Agent", included: false }
                        ]}
                        cta="Choose Plan"
                    />

                    <PricingCard
                        name="Pro"
                        price="$149"
                        period="/mo"
                        priceId="price_1Sjjy4BBwifSvpdIIJxsl1yz"
                        badge="Best Value"
                        features={[
                            { name: "30 AI-generated videos", included: true },
                            { name: "300+ AI creators", included: true },
                            { name: "35+ languages", included: true },
                            { name: "2-minute rendering", included: true },
                            { name: "Sora 2", included: true },
                            { name: "Bulk content generator", included: true },
                            { name: "B-roll generator", included: true },
                            { name: "Product-in-hand", included: true },
                            { name: "Video Agent", included: true }
                        ]}
                        cta="Choose Plan"
                        highlighted
                    />

                    <PricingCard
                        name="Custom"
                        price="Let's Talk"
                        features={[
                            { name: "50–500 videos", included: true },
                            { name: "Everything in Pro", included: true },
                            { name: "API access", included: true },
                            { name: "Dedicated manager", included: true },
                            { name: "Team seats", included: true },
                            { name: "24/7 support", included: true }
                        ]}
                        cta="Contact Sales"
                        ctaLink="/contact"
                    />
                </div>
            </div>
        </section>
    );
}

interface Feature {
    name: string;
    included: boolean;
}

interface PricingCardProps {
    name: string;
    price: string;
    period?: string;
    badge?: string;
    features: Feature[];
    cta: string;
    priceId?: string;
    ctaLink?: string;
    highlighted?: boolean;
}

function PricingCard({ name, price, period, badge, features, cta, priceId, ctaLink, highlighted }: PricingCardProps) {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        // Contact/Custom plan
        if (ctaLink) {
            window.location.href = ctaLink;
            return;
        }


        // Subscription plans - CANONICAL v1.0 + AUTH REQUIRED
        if (!priceId) {
            alert("No price ID configured");
            return;
        }

        // Check if user is logged in
        const token = localStorage.getItem('token');

        if (!token) {
            // STATE A: Not logged in → redirect to register
            window.location.href = '/register?redirect=/pricing';
            return;
        }

        setLoading(true);
        try {
            // STATE B/C: Authenticated checkout
            const response = await fetch(
                "https://studio-genie-backend.onrender.com/api/stripe/checkout/subscription",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`  // ← Auth required
                    },
                    body: JSON.stringify({ priceId })
                }
            );

            if (!response.ok) {
                if (response.status === 401) {
                    // Token expired
                    alert('Session expired. Please login again.');
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    return;
                }
                const error = await response.json();
                throw new Error(error.detail || "Checkout failed");
            }

            const data = await response.json();

            if (data.url) {
                // Redirect to Stripe checkout
                window.location.href = data.url;
            } else {
                throw new Error("No checkout URL returned");
            }
        } catch (error: any) {
            console.error("[CHECKOUT] Subscription checkout failed:", error);
            alert(error.message || "Checkout failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-8 flex flex-col 
            ${highlighted ? "border-2 border-black scale-105" : "border border-gray-200"}`}>

            {badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 rounded-full text-sm font-bold">
                    {badge}
                </div>
            )}

            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold">{name}</h3>
                <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-extrabold">{price}</span>
                    {period && <span className="text-gray-600 ml-1">{period}</span>}
                </div>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
                {features.map((feature, index) => (
                    <li key={index} className="flex gap-2 items-start">
                        {feature.included ? (
                            <span className="text-black text-xl">✓</span>
                        ) : (
                            <span className="text-gray-300 text-xl">✗</span>
                        )}
                        <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                            {feature.name}
                        </span>
                    </li>
                ))}
            </ul>

            <button
                onClick={handleCheckout}
                disabled={loading}
                className={`block text-center px-6 py-3 rounded-xl font-bold transition ${highlighted
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-100 text-black hover:bg-gray-200"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                {loading ? "Loading..." : cta}
            </button>
        </div>
    );
}
