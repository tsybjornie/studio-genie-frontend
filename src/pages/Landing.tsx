import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import VideoMarquee from "../components/VideoMarquee";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import FAQandContact from "../components/FAQandContact";
import Footer from "../components/Footer";

export default function Landing() {
    return (
        <div>
            <Navbar />
            <Hero />
            <VideoMarquee />
            <HowItWorks />
            <Testimonials />
            <Pricing />
            <FAQandContact />
            <Footer />
        </div>
    );
}
