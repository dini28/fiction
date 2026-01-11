import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './SectionMarquee.css';

const SectionMarquee = ({ text = "GAMING REVOLUTION • NEXT GEN • IMMERSIVE •", speed = 2, reverse = false }) => {
    const marqueeRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        const content = contentRef.current;
        if (!marquee || !content) return;

        // Clone content to ensure seamless loop
        // We handle this via CSS animation usually, but for GSAP control:
        const ctx = gsap.context(() => {
            const width = content.offsetWidth;
            const distance = width / 2; // Assuming duplication

            gsap.to(content, {
                x: reverse ? distance : -distance,
                duration: 20 / speed,
                ease: "none",
                repeat: -1
            });
        }, marquee);

        return () => ctx.revert();
    }, [speed, reverse]);

    // Duplicate text enough times to fill screen + buffer
    const content = (
        <>
            <span className="marquee-text">{text}</span>
            <span className="marquee-text">{text}</span>
            <span className="marquee-text">{text}</span>
            <span className="marquee-text">{text}</span>
        </>
    );

    return (
        <div className="section-marquee-wrapper">
            <div className="section-marquee" ref={marqueeRef}>
                <div className="marquee-content" ref={contentRef}>
                    {content}
                </div>
            </div>
            <div className="marquee-overlay"></div>
        </div>
    );
};

export default SectionMarquee;
