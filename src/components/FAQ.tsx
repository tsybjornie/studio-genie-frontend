import { useState } from "react";

export default function FAQ() {
    return (
        <section id="faq" className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-4">
                    Frequently Asked Questions
                </h2>
                <p className="text-center text-gray-600 text-lg mb-12">
                    Everything you need to know about using Studio Genie
                </p>

                <div className="space-y-4">
                    <FAQItem
                        question="Do I own the videos generated with Studio Genie?"
                        answer="Yes, you own the final exported videos and can use them for your brand, ads, and social media, as long as you comply with the policies of each platform (Meta, TikTok, YouTube, etc.). We don't claim ownership of your scripts, assets, or final exports."
                    />
                    <FAQItem
                        question="Can platforms ban my account for using AI creators?"
                        answer="We cannot guarantee how each platform will enforce its policies. Many brands already run AI-generated creatives without issues, but you are responsible for complying with local advertising laws and platform rules. Studio Genie is a tool, not a legal advisor."
                    />
                    <FAQItem
                        question="Is this a replacement for a human creator or legal review?"
                        answer="No. Studio Genie is a production accelerator. It speeds up your content output, but it does not replace professional legal review, compliance checks, or long-term brand strategy."
                    />
                    <FAQItem
                        question="Do you offer refunds?"
                        answer="Because Studio Genie provides digital services and instantly-usable video outputs, all sales are generally final. In rare cases of technical failure on our side (e.g., you paid and received nothing), our team will investigate and may provide credits or a refund at our discretion."
                    />
                    <FAQItem
                        question="What happens if my script contains sensitive topics?"
                        answer="We may refuse or restrict content that includes hate, explicit adult material, self-harm, or other unsafe topics. If content violates our safety rules, your generation may be blocked and your account may be reviewed."
                    />
                    <FAQItem
                        question="Can I use real people's likeness or celebrity names?"
                        answer="You are responsible for having the rights to any likeness, brand, or trademark you reference. Do not impersonate real people or mislead viewers. Studio Genie does not grant you rights to use any third-party likeness."
                    />
                    <FAQItem
                        question="Is my data and my clients' data safe?"
                        answer="We don't sell your data. Scripts and videos are processed only to generate your content and improve product reliability. Do not upload confidential, medical, financial, or highly sensitive data into Studio Genie."
                    />
                    <FAQItem
                        question="Can I cancel my subscription anytime?"
                        answer="Yes. You can cancel future renewals at any time. Your account will remain active until the end of the current billing period. We do not retroactively refund unused time."
                    />
                    <FAQItem
                        question="What happens if Studio Genie is down or unavailable?"
                        answer="While we aim for high uptime, occasional outages or maintenance windows may happen. In such cases, we will restore service as fast as possible but are not liable for lost campaigns, ad performance, or indirect damages."
                    />
                    <FAQItem
                        question="Is the 1 free trial video really free?"
                        answer="Yes, each new account gets one trial video to test the quality and workflow. Abuse of the trial system (for example, creating multiple accounts to avoid paying) may result in blocks, revoked access, or permanent bans."
                    />
                </div>
            </div>
        </section>
    );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
            >
                <span className="font-semibold text-gray-900">{question}</span>
                <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{answer}</p>
                </div>
            )}
        </div>
    );
}
