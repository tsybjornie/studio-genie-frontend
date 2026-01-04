import { Link } from "react-router-dom";

interface SidebarProps {
    currentView: 'home' | 'projects' | 'credits' | 'settings';
    onNavigate: (view: 'home' | 'projects' | 'credits' | 'settings') => void;
    userEmail: string;
    userName: string;
    userPlan: string;
    onLogout: () => void;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
}

export default function Sidebar({
    currentView,
    onNavigate,
    userEmail,
    userName,
    userPlan,
    onLogout,
    mobileMenuOpen,
    setMobileMenuOpen
}: SidebarProps) {
    const navItems = [
        { id: 'home' as const, label: 'Home', icon: '🏠' },
        { id: 'projects' as const, label: 'Projects', icon: '📁' },
        { id: 'credits' as const, label: 'Credits', icon: '⚡' },
        { id: 'settings' as const, label: 'Settings', icon: '⚙️' },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl text-white"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 h-screen w-60 bg-black border-r border-white/10 flex flex-col z-40
                transition-transform duration-300 ease-in-out
                ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                {/* Top Section */}
                <div className="p-6 border-b border-white/10">
                    <Link to="/" className="block">
                        <img src="/assets/logo.png" alt="Studio Genie" className="h-10 w-auto" />
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                onNavigate(item.id);
                                setMobileMenuOpen(false);
                            }}
                            className={`
                                w-full flex items-center gap-3 px-4 py-3 rounded-2xl mb-2 transition dashboard-body
                                ${currentView === item.id
                                    ? 'bg-white/10 text-white shadow-lg shadow-white/5'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }
                            `}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Bottom Section - User Profile */}
                <div className="p-4 border-t border-white/10">
                    <div className="mb-3">
                        <div className="text-white helper-text font-medium truncate">
                            {userName || userEmail}
                        </div>
                        <div className="text-gray-500 helper-text">{userPlan}</div>
                    </div>
                    <button
                        onClick={onLogout}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition helper-text"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div
                    onClick={() => setMobileMenuOpen(false)}
                    className="md:hidden fixed inset-0 bg-black/50 z-30"
                />
            )}
        </>
    );
}
