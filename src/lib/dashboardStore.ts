type DashboardState = {
    credits: number;
    videos: number;
    videoList: {
        id: string;
        text: string;
        language: string;
        createdAt: string;
        videoUrl?: string;
        thumbnailUrl?: string;
        duration?: number;
        status?: string;
    }[];
};

const KEY = "studio_genie_dashboard";

export function loadDashboard(): DashboardState {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
        return {
            credits: 3,
            videos: 0,
            videoList: [],
        };
    }
    return JSON.parse(raw);
}

export function saveDashboard(state: DashboardState) {
    localStorage.setItem(KEY, JSON.stringify(state));
}
