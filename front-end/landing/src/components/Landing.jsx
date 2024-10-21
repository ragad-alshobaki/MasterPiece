import Activities from "./sections/Activities";
import Events from "./sections/Events";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";

export default function Landing() {
    return(
        <>
        <Navbar />
        <Hero />
        <Events />
        <Activities />
        <Footer />
        </>
    )
}