export default function Hero() {
    return (
        <section className="pt-32 pb-20 bg-gradient-to-b from-black via-gray-950 to-black text-white">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h1 className="hero-headline md:text-6xl lg:text-7xl">
                    Everyone's Making AI Videos.
                    <br />
                    <span className="text-gray-300">
                        You Should Too. 📈
                    </span>
                </h1>

                <p className="mt-8 hero-subheadline md:text-xl max-w-4xl mx-auto text-gray-400">
                    Studio Genie: Where content creators become content machines.
                </p>

                <div className="mt-12 flex justify-center">
                    <a
                        href="/signup"
                        className="px-10 py-4 bg-white text-black rounded-2xl text-lg font-medium shadow-2xl hover:bg-gray-100 transition-all transform hover:scale-105"
                    >
                        Create Your First Video
                    </a>
                </div>
            </div>
        </section>
    );
}
