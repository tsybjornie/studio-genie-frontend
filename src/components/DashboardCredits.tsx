interface DashboardCreditsProps {
    credits: number;
    onBuyCredits: (pack: "small" | "medium" | "power") => void;
}

export default function DashboardCredits({ credits, onBuyCredits }: DashboardCreditsProps) {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="section-heading text-white mb-2">Credits</h1>
                <p className="text-gray-500 body-text">Manage your video generation credits</p>
            </div>

            {/* Current Balance - Large & Prominent */}
            <div className="bg-white/10 backdrop-blur-xl p-12 rounded-3xl border-2 border-white/20 shadow-xl shadow-white/10 text-center">
                <p className="text-gray-400 card-title mb-4">Current Balance</p>
                <p className="text-8xl font-medium text-white mb-6">{credits}</p>
                <p className="text-gray-400 dashboard-body">credits remaining</p>
            </div>

            {/* Buy Credits Section */}
            <div>
                <h2 className="section-heading text-white mb-2">Buy Credits</h2>
                <p className="text-gray-500 dashboard-body mb-6">
                    Credits deduct automatically when a video is generated
                </p>

                <div className="grid md:grid-cols-3 gap-5">
                    {/* Small Pack */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex flex-col">
                        <h3 className="card-title text-white mb-1">Small</h3>
                        <p className="text-gray-400 mb-1 dashboard-body">$25</p>
                        <p className="helper-text text-gray-500 mb-3">≈ 2 videos</p>
                        <button
                            onClick={() => onBuyCredits("small")}
                            className="w-full bg-white text-black py-3 rounded-2xl font-medium hover:bg-gray-100 transition mt-auto"
                        >
                            Buy Small Pack
                        </button>
                        <p className="helper-text text-gray-500 text-center mt-2">Good for testing</p>
                    </div>

                    {/* Medium Pack - Highlighted */}
                    <div className="bg-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-5 flex flex-col relative shadow-xl shadow-white/10">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-black px-3 py-1 rounded-full text-xs font-medium">
                            Most Popular ⭐
                        </div>
                        <h3 className="card-title text-white mb-1 mt-2">Medium</h3>
                        <p className="text-gray-400 mb-1 dashboard-body">$65</p>
                        <p className="helper-text text-gray-500 mb-3">≈ 5 videos</p>
                        <button
                            onClick={() => onBuyCredits("medium")}
                            className="w-full bg-white text-black py-3 rounded-2xl font-medium hover:bg-gray-100 transition mt-auto"
                        >
                            Buy Medium Pack
                        </button>
                        <p className="helper-text text-gray-500 text-center mt-2">Best value for creators</p>
                    </div>

                    {/* Power Pack */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex flex-col">
                        <h3 className="card-title text-white mb-1">Power</h3>
                        <p className="text-gray-400 mb-1 dashboard-body">$119</p>
                        <p className="helper-text text-gray-500 mb-3">≈ 8 videos</p>
                        <button
                            onClick={() => onBuyCredits("power")}
                            className="w-full bg-black border border-white/20 text-white py-3 rounded-2xl font-medium hover:bg-gray-900 transition mt-auto"
                        >
                            Buy Power Pack
                        </button>
                        <p className="helper-text text-gray-500 text-center mt-2">Built for scale</p>
                    </div>
                </div>

                <p className="text-center text-gray-500 helper-text mt-4">
                    Credits are added instantly. Unused credits never expire.
                </p>
            </div>
        </div>
    );
}
