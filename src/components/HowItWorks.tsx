export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="section-heading md:text-4xl text-center text-black">
                    Create High-Converting Videos in Minutes
                </h2>
                <p className="text-center text-gray-600 mt-3 mb-16 body-text">
                    No editing. No camera. No learning curve.
                </p>

                <div className="grid md:grid-cols-3 gap-10 mt-16">
                    <StepCard
                        number="1"
                        title="Drop Your Idea"
                        description="Paste a script, a hook, or even a rough thought."
                        microtext="No formatting needed."
                        emphasized={false}
                    />
                    <StepCard
                        number="2"
                        title="Choose Your AI Creator"
                        description="Pick a style, voice, and vibe that fits your brand."
                        microtext="Ads, UGC, or organic content."
                        emphasized={true}
                    />
                    <StepCard
                        number="3"
                        title="Generate & Post"
                        description="Your video is ready in minutes. Download and publish."
                        microtext="Works on TikTok, Reels, Shorts."
                        emphasized={false}
                    />
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16">
                    <a
                        href="/signup"
                        className="inline-block px-10 py-4 bg-black text-white rounded-2xl text-lg font-medium shadow-xl hover:bg-gray-900 transition-all transform hover:scale-105"
                    >
                        Create Your First Video
                    </a>
                    <p className="text-gray-500 helper-text mt-3">
                        Takes less than 2 minutes
                    </p>
                </div>
            </div>
        </section>
    );
}

function StepCard({
    number,
    title,
    description,
    microtext,
    emphasized
}: {
    number: string;
    title: string;
    description: string;
    microtext: string;
    emphasized: boolean;
}) {
    return (
        <div className={`
            bg-gray-50/50 backdrop-blur-xl p-8 rounded-3xl shadow-lg hover:shadow-xl transition 
            ${emphasized ? 'border-2 border-black ring-4 ring-gray-200 transform scale-105' : 'border border-gray-200/50'}
        `}>
            <div className={`
                text-5xl mb-6 w-16 h-16 flex items-center justify-center rounded-2xl font-medium
                ${emphasized ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}
            `}>
                {number}
            </div>
            <h3 className="card-title text-black mb-3">{title}</h3>
            <p className="body-text text-gray-700 mb-3">{description}</p>
            <p className="helper-text text-gray-500 italic">{microtext}</p>
        </div>
    );
}
