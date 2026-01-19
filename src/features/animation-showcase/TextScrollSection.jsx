import React, { useRef } from 'react';

import './TextScrollSection.css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);

const TextScrollSection = () => {
    const sectionRef = useRef(null);
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);
    const row3Ref = useRef(null);

    useGSAP(() => {
        // Base marquee animation
        const rows = [row1Ref.current, row2Ref.current, row3Ref.current];

        // Row 1: Left to Right
        gsap.to(row1Ref.current, {
            xPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                scrub: 0.5,
                start: "top bottom",
                end: "bottom top",
            }
        });

        // Row 2: Right to Left (Inverse speed)
        gsap.to(row2Ref.current, {
            xPercent: 10,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                scrub: 0.5,
                start: "top bottom",
                end: "bottom top",
            }
        });

        // Row 3: Left to Right
        gsap.to(row3Ref.current, {
            xPercent: -30,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                scrub: 0.5,
                start: "top bottom",
                end: "bottom top",
            }
        });

        // Velocity Skew Effect
        let proxy = { skew: 0 },
            skewSetter = gsap.quickSetter(rows, "skewX", "deg"),
            clamp = gsap.utils.clamp(-20, 20);

        ScrollTrigger.create({
            onUpdate: (self) => {
                let skew = clamp(self.getVelocity() / -300);

                // Only skew if velocity is significant
                if (Math.abs(skew) > 0.1) {
                    skewSetter(skew);
                }
            }
        });

        // Smoothly when scrolling stops
        gsap.ticker.add(() => {
            if (Math.abs(proxy.skew) > 0.1) {
                proxy.skew *= 0.9; // Decay
                skewSetter(proxy.skew);
            }
        });

        // Update proxy from ScrollTrigger
        ScrollTrigger.create({
            onUpdate: (self) => {
                const velocitySkew = clamp(self.getVelocity() / -300);
                // Override the decay if we are actively scrolling
                if (Math.abs(velocitySkew) > Math.abs(proxy.skew)) {
                    proxy.skew = velocitySkew;
                    skewSetter(proxy.skew);
                }
            }
        });

    }, { scope: sectionRef });

    return (
        <section className="text-scroll-section" ref={sectionRef}>
            {/* ROW 1 */}
            <div className="scroll-row" ref={row1Ref} style={{ marginLeft: '-20%' }}>
                <span className="scroll-text-item">JOIN THE RANKS</span>
                <span className="scroll-text-item filled">BUILD THE FUTURE</span>
                <span className="scroll-text-item">JOIN THE RANKS</span>
                <span className="scroll-text-item filled">BUILD THE FUTURE</span>
            </div>

            {/* ROW 2 */}
            <div className="scroll-row" ref={row2Ref} style={{ marginLeft: '-50%' }}>
                <span className="scroll-text-item accent">CREATE LEGACIES</span>
                <span className="scroll-text-item">DEFY LIMITS</span>
                <span className="scroll-text-item accent">CREATE LEGACIES</span>
                <span className="scroll-text-item">DEFY LIMITS</span>
            </div>

            {/* ROW 3 */}
            <div className="scroll-row" ref={row3Ref} style={{ marginLeft: '-10%' }}>
                <span className="scroll-text-item filled">BE A LEGEND</span>
                <span className="scroll-text-item">START NOW</span>
                <span className="scroll-text-item filled">BE A LEGEND</span>
                <span className="scroll-text-item">START NOW</span>
            </div>
        </section>
    );
};

// React.memo optimization
export default React.memo(TextScrollSection);
