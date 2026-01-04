import { useState } from "react";

export default function FAQandContact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // For now, just show success message
        // In production, this would send to a backend API
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
        }, 3000);
    };

    const faqs = [
        {
            question: "Do I own the videos generated with Studio Genie?",
            answer: "Yes! You retain full ownership of all videos generated while your account is active. You can use them commercially without attribution."
        },
        {
            question: "Can platforms ban my account for using AI creators?",
            answer: "Studio Genie generates content designed to comply with platform guidelines. However, you are responsible for reviewing outputs and ensuring they meet specific platform requirements."
        },
        {
            question: "Is this a replacement for a human creator or legal review?",
            answer: "No. Studio Genie is a creative tool. Outputs should be reviewed before use, especially for compliance, legal, or professional contexts."
        },
        {
            question: "Do you offer refunds?",
            answer: "All purchases including subscriptions and credit packs are non-refundable, except where required by law. Credits are consumed upon use."
        },
        {
            question: "What happens if my script contains sensitive topics?",
            answer: "Our AI may refuse or modify content that violates our acceptable use policy. You are responsible for ensuring your content complies with laws and regulations."
        },
        {
            question: "Can I use real people's likeness or celebrity names?",
            answer: "You may not generate content that infringes on intellectual property or privacy rights. Use of real people or celebrities may require permission."
        },
        {
            question: "Is my data and my clients' data safe?",
            answer: "We use industry-standard security measures to protect your data. See our Privacy Policy for details on how we collect, use, and protect information."
        },
        {
            question: "Can I cancel my subscription anytime?",
            answer: "Yes, you can cancel anytime. However, remaining credits or subscription time are non-refundable."
        },
        {
            question: "What happens if Studio Genie is down or unavailable?",
            answer: "While we strive for maximum uptime, occasional downtime may occur. We do not guarantee uninterrupted service. See our Terms for details."
        },
        {
            question: "What happens if I run out of credits?",
            answer: "If your account has insufficient credits, video generation will not start. You can purchase additional credits at any time to continue using the platform."
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-black via-gray-950 to-black" id="faq">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-white">FAQ & Contact Us</h2>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* FAQ Column */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-center text-white">Frequently Asked Questions</h3>
                        <p className="text-gray-400 mb-8 text-center">Everything you need to know about using Studio Genie</p>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <details key={index} className="bg-white/5 backdrop-blur-xl p-4 rounded-lg shadow-sm border border-white/10">
                                    <summary className="font-semibold cursor-pointer hover:text-gray-300 transition text-white">
                                        {faq.question}
                                    </summary>
                                    <p className="mt-3 text-gray-400 text-sm">
                                        {faq.answer}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form Column */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-center text-white">Contact Us</h3>
                        <p className="text-gray-400 mb-8 text-center">Have questions or feedback? Send us a message!</p>

                        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-lg shadow-lg mx-auto max-w-md border border-white/10">
                            {submitted ? (
                                <div className="text-center py-12">
                                    <div className="text-5xl mb-4">✓</div>
                                    <h4 className="text-xl font-bold text-green-600 mb-2">Message Sent!</h4>
                                    <p className="text-gray-600">We'll get back to you soon.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Your Email Address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                                        />
                                    </div>

                                    <input
                                        type="text"
                                        placeholder="Subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                                    />

                                    <textarea
                                        placeholder="Leave a Message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none resize-none"
                                    />

                                    <button
                                        type="submit"
                                        className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                                    >
                                        SEND MESSAGE
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
