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
    alignment = "center"
}) => {
    const containerRef = useRef(null);
    const [scrambledTitle, triggerScramble] = useScrambleText(title, 1500);

    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: { ease: "power3.out" }
        });

        // Background Animation
        tl.fromTo(".hero-bg-image",
            { scale: 1.1, filter: "brightness(0)" },
            { scale: 1, filter: "brightness(0.6) contrast(1.1)", duration: 1.5, ease: "power2.out" }
        );

        // Content Animation
        tl.from(".hero-subtitle-kick", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            delay: 0.2
        }, "-=1.0")
            .from(".hero-main-title", {
                y: 50,
                opacity: 0,
                duration: 1,
                skewY: 2,
                onStart: triggerScramble
            }, "-=0.6")
            .from(".hero-desc", {
                y: 20,
                opacity: 0,
                duration: 0.8
            }, "-=0.6")
            .from(".decorative-element", {
                opacity: 0,
                duration: 1.5,
                stagger: 0.2
            }, "-=1");

    }, { scope: containerRef, dependencies: [title] });

    return (
        <section className="page-hero" ref={containerRef}>
            <div className="hero-bg-wrapper">
                {backgroundImage && (
                    <img src={backgroundImage} alt="custom-hero-bg" className="hero-bg-image" />
                )}
                <div className="hero-overlay-gradient"></div>
            </div>

            {/* Decorative Elements */}
            <div className="hero-decorations" aria-hidden="true">
                <div className="decorative-element deco-line deco-line-1"></div>
                <div className="decorative-element deco-line deco-line-2"></div>
                <div className="decorative-element deco-shape">
                    <svg viewBox="0 0 100 100" className="spinning-shape">
                        <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                    </svg>
                </div>
            </div>

            <div className={`page-hero-content ${alignment}`}>
                <div className="hero-subtitle-kick">
                    <span className="subtitle-text">{subtitle}</span>
                </div>
                <h1 className="hero-main-title">{scrambledTitle}</h1>
                {description && <p className="hero-desc">{description}</p>}
            </div>
        </section>
    );
};

export default PageHero;
