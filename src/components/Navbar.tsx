export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="flex items-center gap-2">
                    <img src="/assets/logo.png" alt="Studio Genie" className="h-16 w-auto" />
                </a>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#how-it-works" className="text-gray-300 hover:text-white transition">
                        Product
                    </a>
                    <a href="#pricing" className="text-gray-300 hover:text-white transition">
                        Pricing
                    </a>
                    <a href="/login" className="text-gray-300 hover:text-white transition">
                        Login
                    </a>
                    <a
                        href="/signup"
                        className="px-6 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                        Get Started
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}
