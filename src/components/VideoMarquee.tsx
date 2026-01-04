import './VideoMarquee.css';

export default function VideoMarquee() {
    // TO ADD YOUR VIDEOS:
    // 1. Place your video files in: public/videos/
    // 2. Update the paths below to match your video filenames
    // 3. Videos should be 9:16 aspect ratio (vertical/portrait)
    // 4. Recommended: MP4 format, under 5MB each for fast loading

    const videos = [
        {
            id: 1,
            videoUrl: "/videos/sample1.mp4",  // Replace with your video filename
            thumbnail: "https://placehold.co/270x480/1a1a1a/white?text=Video+1" // Fallback if video doesn't load
        },
        {
            id: 2,
            videoUrl: "/videos/sample2.mp4",
            thumbnail: "https://placehold.co/270x480/1a1a1a/white?text=Video+2"
        },
        {
            id: 3,
            videoUrl: "/videos/sample3.mp4",
            thumbnail: "https://placehold.co/270x480/1a1a1a/white?text=Video+3"
        },
        {
            id: 4,
            videoUrl: "/videos/sample4.mp4",
            thumbnail: "https://placehold.co/270x480/1a1a1a/white?text=Video+4"
        },
        {
            id: 5,
            videoUrl: "/videos/sample5.mp4",
            thumbnail: "https://placehold.co/270x480/1a1a1a/white?text=Video+5"
        },
        {
            id: 6,
            videoUrl: "/videos/sample6.mp4",
            thumbnail: "https://placehold.co/270x480/1a1a1a/white?text=Video+6"
        },
    ];

    return (
        <section className="py-12 bg-black overflow-hidden">
            <div className="marquee-container">
                <div className="marquee-track">
                    {/* First set of videos */}
                    {videos.map((video) => (
                        <div key={`original-${video.id}`} className="video-card">
                            <div className="aspect-[9/16] bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-white/10">
                                {/* Actual video with autoplay */}
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                    poster={video.thumbnail}
                                >
                                    <source src={video.videoUrl} type="video/mp4" />
                                    {/* Fallback to image if video doesn't load */}
                                    <img
                                        src={video.thumbnail}
                                        alt={`Video ${video.id}`}
                                        className="w-full h-full object-cover"
                                    />
                                </video>
                            </div>
                        </div>
                    ))}

                    {/* Duplicate set for seamless loop */}
                    {videos.map((video) => (
                        <div key={`duplicate-${video.id}`} className="video-card">
                            <div className="aspect-[9/16] bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-white/10">
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                    poster={video.thumbnail}
                                >
                                    <source src={video.videoUrl} type="video/mp4" />
                                    <img
                                        src={video.thumbnail}
                                        alt={`Video ${video.id}`}
                                        className="w-full h-full object-cover"
                                    />
                                </video>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
