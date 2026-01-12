import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useScrambleText from '../../../hooks/useScrambleText';
import './PageHero.css';

gsap.registerPlugin(ScrollTrigger);

const PageHero = ({
    title = "PAGE TITLE",
    subtitle = "SECTION",
    description,
    backgroundImage,
    alignment = "left"
}) => {
    const containerRef = useRef(null);
    const [scrambledTitle, triggerScramble] = useScrambleText(title, 1200);

    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: { ease: "power3.out" }
        });

        tl.fromTo(".hero-bg-image",
            { scale: 1.1, filter: "brightness(0)" },
            { scale: 1, filter: "brightness(0.6) contrast(1.1)", duration: 1.5, ease: "power2.out" }
        );

        tl.from(".hero-subtitle-kick", {
            x: -20,
            opacity: 0,
            duration: 0.8,
            delay: 0.5
        }, "-=1.0");

        tl.from(".hero-main-title", {
            y: 30,
            opacity: 0,
            skewY: 5,
            duration: 0.8,
            onStart: triggerScramble
        }, "-=0.6");

        if (description) {
            tl.from(".hero-desc", {
                y: 20,
                opacity: 0,
                duration: 0.8
            }, "-=0.4");
        }

    }, { scope: containerRef, dependencies: [title] });

    return (
        <section className="page-hero" ref={containerRef}>
            <div className="hero-bg-wrapper">
                {backgroundImage && (
                    <img src={backgroundImage} alt="custom-hero-bg" className="hero-bg-image" />
                )}
                <div className="hero-overlay-gradient"></div>
            </div>

            <div className={`page-hero-content ${alignment}`}>
                <div className="hero-subtitle-kick">{subtitle}</div>
                <h1 className="hero-main-title">{scrambledTitle}</h1>
                {description && <p className="hero-desc">{description}</p>}
            </div>
        </section>
    );
};

export default PageHero;
