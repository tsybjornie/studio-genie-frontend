export default function Privacy() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <nav className="bg-white border-b px-6 py-4">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <a href="/" className="font-bold text-lg">Studio Genie ✦</a>
                    <a href="/" className="text-gray-600 hover:text-gray-900">← Back to Home</a>
                </div>
            </nav>

            {/* Privacy Policy Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-gray-600 mb-8">Effective Date: December 22, 2025</p>

                <div className="prose prose-lg max-w-none">
                    <p className="mb-6">
                        Studio Genie ("we", "our", or "us") respects your privacy and is committed to protecting personal information collected through our website, applications, and services (collectively, the "Services"). This Privacy Policy explains what information we collect, how we use it, and the choices you have.
                    </p>

                    <p className="mb-8">
                        This policy applies to individual users of Studio Genie. Data processed on behalf of business or enterprise customers may be governed by separate agreements.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>

                    <h3 className="text-xl font-semibold mt-6 mb-3">a. Information You Provide</h3>
                    <p className="mb-4">We collect information you choose to provide, including:</p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Account Information:</strong> Email address, login credentials, and basic profile details.</li>
                        <li><strong>Billing Information:</strong> Payment method details and transaction history (processed securely by third-party payment providers; we do not store full card details).</li>
                        <li><strong>User Content:</strong> Text prompts, inputs, uploads, and other content you submit to generate videos or interact with our Services.</li>
                        <li><strong>Communications:</strong> Messages sent to us via email, support forms, or customer service channels.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-3">b. Information Collected Automatically</h3>
                    <p className="mb-4">When you use our Services, we may automatically collect:</p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Technical Data:</strong> IP address, browser type, device type, operating system, and basic usage metadata.</li>
                        <li><strong>Usage Data:</strong> Pages visited, features used, generation activity, and interaction timing.</li>
                        <li><strong>Cookies & Similar Technologies:</strong> Used for authentication, security, performance analytics, and basic functionality. You may disable cookies via your browser, though some features may not function properly.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-3">c. Third-Party Platforms</h3>
                    <p className="mb-6">
                        If you interact with Studio Genie through third-party platforms (e.g. social media or integrations), we may receive limited information in accordance with those platforms' privacy settings and policies.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
                    <p className="mb-4">We use personal information to:</p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Operate, maintain, and improve the Services</li>
                        <li>Create and manage user accounts</li>
                        <li>Process payments and manage credit usage</li>
                        <li>Generate AI-powered video content</li>
                        <li>Provide customer support and respond to inquiries</li>
                        <li>Monitor usage for security, fraud prevention, and abuse</li>
                        <li>Comply with legal obligations</li>
                    </ul>
                    <p className="mb-6">
                        We may use aggregated or anonymized data for analytics, product improvement, and internal research. This data does not identify individuals.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">3. AI-Generated Content</h2>
                    <p className="mb-4">Studio Genie uses automated systems and artificial intelligence to generate content based on user inputs.</p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Generated outputs may vary in quality, accuracy, or suitability.</li>
                        <li>We do not guarantee outcomes, results, or performance.</li>
                        <li>You are responsible for reviewing and determining how generated content is used.</li>
                        <li>User inputs and outputs may be used to improve our Services unless you opt out by contacting us at <a href="mailto:help@studiogenie.ai" className="text-violet-600 hover:underline">help@studiogenie.ai</a>.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">4. Payments, Credits, and Refunds</h2>
                    <p className="mb-4">Studio Genie operates on a prepaid credit system.</p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Credits provide access to computational resources and are consumed upon use.</li>
                        <li><strong>All purchases are final.</strong></li>
                        <li><strong>Credits are non-refundable, non-transferable, and not redeemable for cash</strong>, except where required by law.</li>
                        <li>Unused credits may be removed if an account is terminated due to fraud, abuse, or violation of our Terms.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">5. Sharing of Information</h2>
                    <p className="mb-4">We may share information only in the following situations:</p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Service Providers:</strong> Hosting, analytics, payment processing, and customer support providers acting under contractual confidentiality obligations.</li>
                        <li><strong>Legal Requirements:</strong> If required by law, court order, or to protect rights, safety, or security.</li>
                        <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
                    </ul>
                    <p className="mb-6">
                        We do not sell personal information and do not share data for third-party behavioral advertising.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">6. Data Retention</h2>
                    <p className="mb-6">
                        We retain personal information only as long as necessary to provide the Services, meet legal obligations, resolve disputes, and enforce agreements. Data may be deleted or anonymized when no longer required.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">7. Security</h2>
                    <p className="mb-6">
                        We use reasonable technical and organizational safeguards to protect information, including access controls and secure infrastructure. However, no system is completely secure, and you use the Services at your own risk.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">8. Children's Privacy</h2>
                    <p className="mb-6">
                        Studio Genie is not intended for users under the age of 13. We do not knowingly collect personal information from children. If such data is discovered, it will be deleted promptly.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">9. International Use</h2>
                    <p className="mb-6">
                        Studio Genie operates globally. Your information may be processed or stored in jurisdictions outside your country of residence. Where required, appropriate safeguards are used to protect cross-border data transfers.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">10. Your Rights</h2>
                    <p className="mb-4">Depending on your location, you may have rights to:</p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Access or correct your personal information</li>
                        <li>Request deletion of your data</li>
                        <li>Object to or restrict certain processing</li>
                        <li>Withdraw consent where applicable</li>
                    </ul>
                    <p className="mb-6">
                        Requests can be made by contacting <a href="mailto:help@studiogenie.ai" className="text-violet-600 hover:underline">help@studiogenie.ai</a>. Identity verification may be required.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">11. Limitation of Liability</h2>
                    <p className="mb-4">To the maximum extent permitted by law:</p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Studio Genie is not liable for indirect, incidental, or consequential damages.</li>
                        <li>Total liability for any claim will not exceed the amount paid by you in the 30 days prior to the claim.</li>
                        <li>Use of the Services is at your own discretion and risk.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">12. Third-Party Links</h2>
                    <p className="mb-6">
                        Our Services may contain links to third-party websites or tools. We are not responsible for their privacy practices or content.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">13. Changes to This Policy</h2>
                    <p className="mb-8">
                        We may update this Privacy Policy from time to time. Updates will be reflected by revising the effective date above. Continued use of the Services constitutes acceptance of the revised policy.
                    </p>

                    <div className="mt-12 pt-8 border-t">
                        <p className="text-gray-600">
                            For questions about this Privacy Policy, please contact us at <a href="mailto:help@studiogenie.ai" className="text-violet-600 hover:underline">help@studiogenie.ai</a>.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 mt-12">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-gray-400">© 2025 Studio Genie. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
