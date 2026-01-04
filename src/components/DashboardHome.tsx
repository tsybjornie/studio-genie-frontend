interface DashboardHomeProps {
    dashboard: {
        videos: number;
        credits: number;
        videoList: Array<{
            id: string;
            text: string;
            language: string;
            createdAt: string;
            videoUrl?: string;
        }>;
    };
    onBuyCredits: () => void;
    onGenerateVideo: (script: string, language: string) => void;
    generating: boolean;
    error: string;
}

export default function DashboardHome({
    dashboard,
    onBuyCredits,
    onGenerateVideo,
    generating,
    error
}: DashboardHomeProps) {
    const [script, setScript] = useState("");
    const [language, setLanguage] = useState("English");

    const getLastVideoTime = () => {
        if (dashboard.videoList.length === 0) return "Never";
        const lastVideo = dashboard.videoList[0];
        const date = new Date(lastVideo.createdAt);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return diffMins <= 1 ? "Just now" : `${diffMins} mins ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        return `${diffDays} days ago`;
    };

    const hasCredits = dashboard.credits >= 3;

    const handleGenerate = () => {
        if (script.trim()) {
            onGenerateVideo(script, language);
            setScript("");
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="section-heading text-white mb-2">Your Video Engine</h1>
                <p className="text-gray-500 body-text">Overview of your account</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Videos Generated */}
                <div className="bg-white/5 backdrop-blur-xl p-5 rounded-3xl border border-white/10 flex flex-col">
                    <h3 className="card-title text-gray-400 mb-2">Videos Generated</h3>
                    <p className="metric-number text-white mb-auto">
                        {dashboard.videos}
                    </p>
                    <p className="helper-text text-gray-500 mt-2">Last: {getLastVideoTime()}</p>
                </div>

                {/* Credits Remaining - Prominent */}
                <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border-2 border-white/20 shadow-xl shadow-white/10 flex flex-col relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-black px-3 py-1 rounded-full text-xs font-medium">
                        Balance ⚡
                    </div>
                    <h3 className="card-title text-gray-300 mb-2 mt-2">Credits Remaining</h3>
                    <p className="text-6xl font-medium text-white mb-2">{dashboard.credits}</p>
                    {dashboard.credits === 0 ? (
                        <button
                            onClick={onBuyCredits}
                            className="px-4 py-2 bg-white text-black rounded-2xl text-sm font-medium hover:bg-gray-100 transition mt-2"
                        >
                            Buy Credits →
                        </button>
                    ) : (
                        <p className="helper-text text-gray-400 mt-auto">3 credits = 1 video</p>
                    )}
                </div>

                {/* Plan */}
                <div className="bg-white/5 backdrop-blur-xl p-5 rounded-3xl border border-white/10 flex flex-col">
                    <h3 className="card-title text-gray-400 mb-2">Plan</h3>
                    <p className="dashboard-body text-white font-medium mb-1">Pay-As-You-Go</p>
                    <p className="helper-text text-gray-500 mt-auto">No subscription · No expiry</p>
                </div>
            </div>

            {/* Create Video Section - Inline */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
                <h2 className="section-heading text-white mb-2">Create a Video</h2>

                {!hasCredits && (
                    <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
                        <p className="text-yellow-400 dashboard-body">
                            You need 3 credits to generate a video.
                            <button
                                onClick={onBuyCredits}
                                className="underline ml-2"
                            >
                                Buy credits →
                            </button>
                        </p>
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                        <p className="text-red-400 body-text">{error}</p>
                    </div>
                )}

                <textarea
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    placeholder="Example: Hey! In this video I'll show you how to..."
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 mb-4 body-text focus:outline-none focus:border-white/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    rows={4}
                    disabled={generating || !hasCredits}
                />

                <div className="flex flex-col sm:flex-row gap-4">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white dashboard-body focus:outline-none focus:border-white/30 transition disabled:opacity-50"
                        disabled={generating || !hasCredits}
                    >
                        <option className="bg-gray-900">English</option>
                        <option className="bg-gray-900">Chinese</option>
                        <option className="bg-gray-900">Malay</option>
                    </select>

                    <button
                        onClick={handleGenerate}
                        disabled={generating || !hasCredits || !script.trim()}
                        className="flex-1 px-8 py-3 bg-white text-black rounded-2xl font-medium hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {generating ? "Generating..." : "Generate Video (3 credits)"}
                    </button>
                </div>

                <p className="text-center text-gray-600 helper-text mt-4">
                    AI-generated content may require human review before publishing.
                </p>
            </div>

            {/* Recent Videos */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-3xl">
                <h3 className="card-title text-white mb-4">Recent Videos</h3>

                {dashboard.videoList.length === 0 && (
                    <p className="text-gray-500 body-text">No videos yet. Create your first video to get started!</p>
                )}

                <div className="space-y-3">
                    {dashboard.videoList.slice(0, 5).map((v) => (
                        <div
                            key={v.id}
                            className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition"
                        >
                            <div className="dashboard-body font-medium text-white mb-1">{v.language}</div>
                            <div className="text-gray-300 dashboard-body mb-2 truncate">{v.text}</div>
                            <div className="text-gray-500 helper-text">
                                {new Date(v.createdAt).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Add useState import at top
import { useState } from "react";
