export default function Features() {
    return (
        <section id="features" className="py-24 bg-pink-50">
            <h2 className="text-4xl font-extrabold text-center">Why Creators Love Génie</h2>

            <div className="grid md:grid-cols-3 gap-10 mt-16 max-w-6xl mx-auto px-6">
                <FeatureCard
                    title="Auto-Editing Engine"
                    desc="Cuts, pacing, captions, transitions — Génie edits your video like a pro, instantly."
                />
                <FeatureCard
                    title="Script → Video Mode"
                    desc="Paste your ideas and watch Génie visualize them in seconds with matching scenes."
                />
                <FeatureCard
                    title="Creator-Optimized Formats"
                    desc="Outputs for TikTok, Reels, Shorts, Ads, UGC, or long-form storytelling."
                />
            </div>
        </section>
    );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-pink-600">{title}</h3>
            <p className="mt-3 text-gray-600">{desc}</p>
        </div>
    );
}
