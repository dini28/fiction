import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Hero.css'
import MagneticButton from '../../../components/ui/MagneticButton/MagneticButton';
import useScrambleText from '../../../hooks/useScrambleText';


const Hero = () => {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const currentYear = new Date().getFullYear();
    const [titleText, triggerScramble] = useScrambleText("CHAMPIONS", 1500);


    useEffect(() => {
        const timer = setTimeout(() => setVideoLoaded(true), 8000);
        return () => clearTimeout(timer);
    }, []);

    const containerRef = useRef();

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-badge", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            delay: 0.2
        })
            .from(".main-title .line-top", {
                y: 50,
                opacity: 0,
                duration: 1,
                skewY: 2
            }, "-=0.4")
            .from(".main-title .line-bottom", {
                y: 50,
                opacity: 0,
                duration: 1,
                skewY: 2,
                onStart: () => triggerScramble() // Trigger the scramble effect when this animation starts
            }, "-=0.8")
            .from(".hero-subtitle", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                letterSpacing: "1em"
            }, "-=0.6")
            .from(".hero-description", {
                y: 20,
                opacity: 0,
                duration: 0.8
            }, "-=0.6")
            .from(".hero-cta", {
                y: 20,
                opacity: 0,
                duration: 0.6
            }, "-=0.6")
            .from(".decorative-element", {
                opacity: 0,
                duration: 1.5,
                stagger: 0.2
            }, "-=1");

    }, { scope: containerRef });

    return (
        <section className="hero-section" role="banner" ref={containerRef}>
            <div className="hero-background-wrapper" aria-hidden="true">
                <div className="video-container">
                    <iframe
                        src="https://www.youtube.com/embed/fvbEnWLRo1s?autoplay=1&mute=1&loop=1&playlist=fvbEnWLRo1s&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
                        title="Esports Tournament Background Video"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        loading="lazy"
                        className={`hero-video ${videoLoaded ? 'is-loaded' : ''}`}
                    ></iframe>
                </div>
                <div className="hero-overlay"></div>
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

            <div className="hero-content">
                <div className="hero-badge">
                    <span className="badge-text">SEASON {currentYear}</span>
                </div>

                <div className="main-title">
                    <div className="line line-top" aria-hidden="true">ESPORTS</div>
                    <div className="line line-bottom text-highlight" aria-hidden="true">{titleText}</div>
                </div>

                <div className="hero-subtitle">TOURNAMENT SERIES</div>

                <p className="hero-description">
                    Witness the evolution of competitive gaming. The world's elite teams clash for glory, honor, and the championship title.
                </p>

                <div className="hero-cta">
                    <MagneticButton href="#join" aria-label="Join the Battle">
                        <span>Join the Battle</span>
                        <FontAwesomeIcon icon={faArrowRight} className="icon" />
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
};

export default Hero;