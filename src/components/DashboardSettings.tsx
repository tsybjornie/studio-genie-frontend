import { useState } from "react";

interface DashboardSettingsProps {
    userEmail: string;
    userName: string;
    onSaveUsername: (newUsername: string) => void;
}

export default function DashboardSettings({
    userEmail,
    userName,
    onSaveUsername
}: DashboardSettingsProps) {
    const [editingUsername, setEditingUsername] = useState(false);
    const [newUsername, setNewUsername] = useState(userName);

    const handleSave = () => {
        onSaveUsername(newUsername);
        setEditingUsername(false);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="section-heading text-white mb-2">Settings</h1>
                <p className="text-gray-500 body-text">Manage your account preferences</p>
            </div>

            {/* Profile Section */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <h3 className="card-title text-white mb-6">Profile Information</h3>

                {/* Username */}
                <div className="mb-6">
                    <label className="block text-gray-400 dashboard-body mb-2">Username</label>
                    {editingUsername ? (
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition body-text"
                                placeholder="Enter username"
                            />
                            <button
                                onClick={handleSave}
                                className="px-6 py-3 bg-white text-black rounded-2xl font-medium hover:bg-gray-100 transition"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    setEditingUsername(false);
                                    setNewUsername(userName);
                                }}
                                className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-2xl">
                            <span className="text-white dashboard-body">{userName || "Not set"}</span>
                            <button
                                onClick={() => setEditingUsername(true)}
                                className="text-gray-400 hover:text-white helper-text"
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </div>

                {/* Email (Read-only) */}
                <div>
                    <label className="block text-gray-400 dashboard-body mb-2">Email</label>
                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-gray-400 dashboard-body">{userEmail}</span>
                    </div>
                    <p className="helper-text text-gray-500 mt-2">Email cannot be changed</p>
                </div>
            </div>

            {/* Account Info */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <h3 className="card-title text-white mb-4">Account Information</h3>

                <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                        <span className="text-gray-400 dashboard-body">Plan</span>
                        <span className="text-white dashboard-body">Pay-As-You-Go</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 dashboard-body">Account Type</span>
                        <span className="text-white dashboard-body">Individual</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
