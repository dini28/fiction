import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({ children, stagger = 0.1, x = 0, y = 30, duration = 0.8, className = "" }) => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const elements = containerRef.current.children;

        gsap.fromTo(elements,
            {
                opacity: 0,
                y: y,
                x: x,
                filter: "blur(10px)"
            },
            {
                opacity: 1,
                y: 0,
                x: 0,
                filter: "blur(0px)",
                duration: duration,
                stagger: stagger,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
};

export default ScrollReveal;
