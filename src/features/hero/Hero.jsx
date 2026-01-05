import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Hero.css'

const Hero = () => {
    const [videoLoaded, setVideoLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVideoLoaded(true), 8000);
        return () => clearTimeout(timer);
    }, []);

    const containerRef = useRef();

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });

        tl.from(".main-title span", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.1
        })
            .from(".subtitle", {
                scale: 0.5,
                opacity: 0,
                duration: 0.8
            }, "-=0.5")
            .from(".description", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.6")
            .from(".cta-button", {
                scale: 0,
                opacity: 0,
                duration: 0.6
            }, "-=0.4")
            .from(".year-badge", {
                x: -50,
                opacity: 0,
                rotation: -45,
                duration: 0.8
            }, 0);

    }, { scope: containerRef });

    return (
        <section className="hero" role="banner" ref={containerRef}>
            <div className="video-background" aria-hidden="true">
                <iframe
                    src="https://www.youtube.com/embed/fvbEnWLRo1s?autoplay=1&mute=1&loop=1&playlist=fvbEnWLRo1s&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
                    title="Esports Tournament Background Video"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    loading="lazy"
                    className={videoLoaded ? 'loaded' : ''}
                ></iframe>
            </div>

            <div className="video-overlay" aria-hidden="true"></div>

            <div className="decorative-lines" aria-hidden="true">
                <div className="line line-1"></div>
                <div className="line line-2"></div>
                <div className="line line-3"></div>
            </div>

            <div className="accent-shapes" aria-hidden="true">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="presentation">
                    <polygon
                        points="100,20 180,60 180,140 100,180 20,140 20,60"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <polygon
                        points="100,40 160,70 160,130 100,160 40,130 40,70"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                </svg>
            </div>

            <div className="hero-content">
                <div className="year-badge">
                    <span>20</span>
                    <span className="x-icon" aria-hidden="true">✕</span>
                    <span>25</span>
                </div>

                <h1 className="main-title">
                    <span>ESPORTS</span>
                    <span className="highlight">CHAMPIONS</span>
                </h1>

                <div className="subtitle" role="text">
                    TOURNAMENT
                </div>

                <p className="description">
                    Watch the biggest plays as the best teams in competitive gaming compete at Champions.
                </p>

                <a
                    href="#join"
                    className="cta-button"
                    aria-label="Join the Battle - Register for tournament"
                >
                    Join the Battle
                    <FontAwesomeIcon className="arrow-icon" icon={faArrowRight} />
                </a>
            </div>
        </section>
    );
};

export default Hero;