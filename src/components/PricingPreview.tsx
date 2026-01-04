export default function PricingPreview() {
    return (
        <section id="pricing" className="py-24 bg-gradient-to-b from-pink-50 to-white">
            <h2 className="text-4xl font-extrabold text-center text-gray-900">
                Simple, Creator-Friendly Pricing
            </h2>

            <p className="text-center mt-4 text-gray-600">
                No contracts. Cancel anytime.
            </p>

            <div className="grid md:grid-cols-3 gap-10 mt-16 max-w-6xl mx-auto px-6">

                <PlanCard
                    name="Starter"
                    price="$39"
                    details="60 credits • ~20 videos"
                />

                <PlanCard
                    name="Creator"
                    price="$79"
                    details="150 credits • ~50 videos"
                />

                <PlanCard
                    name="Pro"
                    price="$149"
                    details="360 credits • ~120 videos"
                />

            </div>
        </section>
    );
}

function PlanCard({ name, price, details }: any) {
    return (
        <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition text-center">
            <h3 className="text-2xl font-bold">{name}</h3>
            <div className="text-4xl font-extrabold mt-4 text-pink-600">{price}</div>
            <p className="mt-4 text-gray-600">{details}</p>

            <a
                href="/login"
                className="mt-8 block px-6 py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition"
            >
                Subscribe
            </a>
        </div>
    );
}
