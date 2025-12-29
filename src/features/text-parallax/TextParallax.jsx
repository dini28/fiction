import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TextParallax.css';

const TextParallax = () => {
    const sectionRef = useRef(null);

    useGSAP(() => {
        const section = sectionRef.current;

        // Animating CSS Custom Properties for performance
        gsap.fromTo(section,
            {
                "--scroll-progress": "0%",
                "--parallax-offset": "-75px" // (0 - 0.5) * 150
            },
            {
                "--scroll-progress": "150%",
                "--parallax-offset": "75px", // (1 - 0.5) * 150
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="text-parallax-section">
            <div className="text-parallax-overlay"></div>
            <div className="text-parallax-content">
                <h2 className="parallax-title" data-text="TRUE IMMERSION">
                    TRUE IMMERSION
                </h2>
                <p className="parallax-subtitle">WHERE REALITY ENDS AND GAMING BEGINS</p>
            </div>
        </section>
    );
};

export default TextParallax;
