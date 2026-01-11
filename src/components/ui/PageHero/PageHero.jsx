import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './PageHero.css';

const PageHero = ({ title, subtitle, description, children }) => {
    const heroRef = useRef();

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(".page-hero-subtitle",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
            .fromTo(".page-hero-title",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power4.out" }, "-=0.6"
            )
            .fromTo(".page-hero-desc",
                { opacity: 0 },
                { opacity: 1, duration: 1 }, "-=0.4"
            )
            .fromTo(".hero-decoration",
                { scaleX: 0 },
                { scaleX: 1, duration: 0.8, ease: "power3.inOut" }, "-=0.8"
            );

    }, { scope: heroRef });

    return (
        <div className="page-hero" ref={heroRef}>
            <div className="page-hero-content">
                <p className="page-hero-subtitle">{subtitle}</p>
                <h1 className="page-hero-title">
                    {title}
                </h1>
                <div className="hero-decoration"></div>
                {description && <p className="page-hero-desc">{description}</p>}
                {children}
            </div>
            <div className="hero-bg-glow"></div>
        </div>
    );
};

export default PageHero;
