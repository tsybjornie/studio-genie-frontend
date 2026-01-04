export default function Testimonials() {
    const testimonials = [
        {
            name: "@jessicalim",
            country: "Singapore",
            text: "Studio Genie replaced almost all my manual editing work. I can now focus on strategy while the platform handles production. My clients think I have a full production team behind me.",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica"
        },
        {
            name: "@lunar.wav",
            country: "USA",
            text: "As a UGC creator, this is a virtual studio on-demand. The output quality is consistent and professional. I've scaled my content output by 3x without burning out.",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lunar"
        },
        {
            name: "@thomasdupont",
            country: "France",
            text: "Output quality is high enough for paid campaigns across multiple platforms. The AI voices and expressions feel natural. This tool saves me hours every single week.",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas"
        },
        {
            name: "@rajmalhotra",
            country: "India",
            text: "Helps me scale without burnout while maintaining quality. The videos look professional and authentic. I can now take on more clients than ever before.",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raj"
        },
        {
            name: "@glitchkid",
            country: "Hong Kong",
            text: "Game changer for my agency workflow. We produce content 5x faster while keeping our creative edge. Our clients are amazed at the turnaround time and quality.",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Glitch"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-black via-gray-950 to-black">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="section-heading md:text-4xl text-center mb-4 text-white">Trusted by creators worldwide</h2>
                <p className="text-center text-gray-400 mb-12 body-text">See what our users are saying</p>

                {/* 5 Column Horizontal Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 hover:shadow-lg transition-shadow"
                        >
                            {/* Avatar */}
                            <div className="flex items-center mb-4">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full bg-white p-1 border-2 border-white/20"
                                />
                                <div className="ml-3">
                                    <div className="font-medium text-white dashboard-body">{testimonial.name}</div>
                                    <div className="helper-text text-gray-400">{testimonial.country}</div>
                                </div>
                            </div>

                            {/* Review Text */}
                            <p className="text-gray-300 dashboard-body italic leading-relaxed">
                                "{testimonial.text}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
