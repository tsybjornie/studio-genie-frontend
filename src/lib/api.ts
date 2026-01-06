// frontend/src/lib/api.ts
const API_URL = import.meta.env.VITE_API_URL || "https://studio-genie-backend.onrender.com";
const TOKEN_KEY = "token";

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
    // Clear ALL storage before setting new token to prevent old user persistence
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
}

type ApiOptions = RequestInit & { auth?: boolean };

export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
    const url = `${API_URL}${path}`;
    const headers = new Headers(options.headers || {});
    headers.set("Content-Type", "application/json");

    if (options.auth) {
        const token = getToken();
        if (token) headers.set("Authorization", `Bearer ${token}`);
    }

    const res = await fetch(url, { ...options, headers });

    // If backend returns JSON error like {detail: "..."} we show it
    let data: any = null;
    const text = await res.text();
    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = text;
    }

    if (!res.ok) {
        const msg =
            (data && typeof data === "object" && (data.detail || data.message)) ||
            (typeof data === "string" ? data : "") ||
            `Request failed: ${res.status}`;
        const err: any = new Error(msg);
        err.status = res.status;
        err.data = data;
        throw err;
    }

    return data as T;
}

// Types (adjust later to match your backend)
export type MeResponse = {
    id?: string;
    email: string;
    credits?: number; // you can support this in backend
};

export type VideoItem = {
    id: string;
    status: "queued" | "rendering" | "done" | "failed";
    created_at?: string;
    prompt?: string;
    output_url?: string;
};

export async function fetchMe() {
    return api<MeResponse>("/users/me", { method: "GET", auth: true });
}

export async function fetchVideos() {
    return api<VideoItem[]>("/videos", { method: "GET", auth: true });
}

// Placeholder create - you will swap endpoint when render pipeline is ready
export async function createVideo(payload: { script: string; language: string }) {
    return api<{ id: string }>("/videos", {
        method: "POST",
        auth: true,
        body: JSON.stringify(payload),
    });
}
