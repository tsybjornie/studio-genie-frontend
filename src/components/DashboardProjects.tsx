interface DashboardProjectsProps {
    videoList: Array<{
        id: string;
        text: string;
        language: string;
        createdAt: string;
        videoUrl?: string;
        status?: string;
    }>;
}

export default function DashboardProjects({ videoList }: DashboardProjectsProps) {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="section-heading text-white mb-2">Projects</h1>
                <p className="text-gray-500 body-text">All your generated videos</p>
            </div>

            {videoList.length === 0 && (
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-3xl text-center">
                    <p className="text-gray-400 body-text mb-4">No videos yet</p>
                    <p className="text-gray-500 helper-text">Click "Create Video" in the sidebar to get started</p>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                {videoList.map((video) => (
                    <div
                        key={video.id}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="dashboard-body font-medium text-white">{video.language}</span>
                                    {video.status && (
                                        <span className="helper-text text-gray-500 bg-white/5 px-2 py-1 rounded-lg">
                                            {video.status}
                                        </span>
                                    )}
                                </div>
                                <div className="text-gray-300 dashboard-body">{video.text}</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                            <div className="text-gray-500 helper-text">
                                {new Date(video.createdAt).toLocaleString()}
                            </div>
                            {video.videoUrl && (
                                <a
                                    href={video.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:underline helper-text flex items-center gap-2"
                                >
                                    View Video →
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
