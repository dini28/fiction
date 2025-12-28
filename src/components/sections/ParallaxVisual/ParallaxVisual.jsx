import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ParallaxVisual.css';
import { parallaxData } from '../../../data/homeSectionsData';

const ParallaxVisual = () => {
    const containerRef = useRef();

    useGSAP(() => {
        const sections = gsap.utils.toArray('.parallax-section');

        sections.forEach((section) => {
            const bg = section.querySelector('.parallax-bg');

            // Safer Parallax: Animate the heavy DOM element transform instead of background-position
            gsap.fromTo(bg,
                { yPercent: -15 },
                {
                    yPercent: 15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );

            // Text Reveal
            const text = section.querySelector('.parallax-text');
            if (text) {
                gsap.from(text, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        });

    }, { scope: containerRef });

    return (
        <div className="parallax-container" ref={containerRef}>
            {parallaxData.map((item) => (
                <section
                    key={item.id}
                    className="parallax-section"
                >
                    <div
                        className="parallax-bg"
                        style={{ backgroundImage: `url('${item.image}')` }}
                    ></div>
                    <div className="parallax-overlay"></div>
                    <div className="parallax-content">
                        <h2 className="parallax-text">
                            <span>{item.title}</span>
                            {item.subtitle}
                        </h2>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default ParallaxVisual;
