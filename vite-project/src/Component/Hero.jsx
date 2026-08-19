import { useEffect, useState } from "react";
import { heroImages, heroTexts } from "./Herodata.jsx";
import catalogue from "../assets/hero/catlogue.pdf";
import { useInquiry } from "../Context/InquiryContext.jsx"; // adjust path as needed

const Hero = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [currentText, setCurrentText] = useState(0);

    const { openInquiry } = useInquiry();

    useEffect(() => {
        const imageInterval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 3000);

        return () => clearInterval(imageInterval);
    }, []);

    useEffect(() => {
        const textInterval = setInterval(() => {
            setCurrentText((prev) => (prev + 1) % heroTexts.length);
        }, 1000);

        return () => clearInterval(textInterval);
    }, []);

    return (
        <section
            className="hero"
            style={{
                backgroundImage: `url(${heroImages[currentImage]})`,
            }}
        >
            <div className="overlay">

                <div className="hero-content">

                    <h1>
                        Manufacturer & Distributor of
                        <br />
                        <span
                            key={currentText}
                            className="animated-text"
                        >
                            {heroTexts[currentText]}
                        </span>
                    </h1>

                    <p>
                       Providing reliable gearbox and motor solutions trusted by OEMs, manufacturers, and industries across India, delivering high performance, durability, and precision.
                    </p>

                    <div className="hero-buttons">

                        <button
                            className="primary-btn"
                            onClick={() => openInquiry()}
                        >
                            Get a Quote
                        </button>

                        <a href={catalogue} download>
                            <button className="secondary-btn">
                                Download Catalogue
                            </button>
                        </a>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Hero;