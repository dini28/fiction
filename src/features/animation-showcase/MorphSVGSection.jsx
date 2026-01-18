import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './MorphSVGSection.css';

gsap.registerPlugin(ScrollTrigger);

const MorphSVGSection = () => {
    const sectionRef = useRef(null);
    const weaponRef = useRef(null);
    const shieldRef = useRef(null);

    useGSAP(() => {
        const weaponEl = weaponRef.current;
        const shieldEl = shieldRef.current;

        // Initial State
        gsap.set(shieldEl, { opacity: 0, scale: 0.8 });
        gsap.set(weaponEl, { opacity: 1, scale: 1 });

        // Loop the state variable ref just for logic tracking
        let currentMode = 'weapon'; // 'weapon' | 'shield'

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            onUpdate: (self) => {
                const shouldBeShield = self.progress > 0.5;
                const newMode = shouldBeShield ? 'shield' : 'weapon';

                if (newMode !== currentMode) {
                    triggerGlitchTransition(shouldBeShield);
                }
            }
        });

        function triggerGlitchTransition(toShield) {
            // Safety check although condition above handles it
            if ((toShield && currentMode === 'shield') || (!toShield && currentMode === 'weapon')) return;

            currentMode = toShield ? 'shield' : 'weapon';

            currentMode = toShield ? 'shield' : 'weapon';

            const outgoing = toShield ? weaponEl : shieldEl;
            const incoming = toShield ? shieldEl : weaponEl;

            const tl = gsap.timeline();

            // Glitch Out
            tl.to(outgoing, {
                duration: 0.1,
                opacity: 0,
                scale: 1.1,
                skewX: 20,
                filter: "blur(5px)",
                ease: "rough({ template: none.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp: false })"
            });

            // Glitch In
            tl.fromTo(incoming,
                { opacity: 0, scale: 0.9, skewX: -20, filter: "blur(5px)" },
                {
                    opacity: 1,
                    scale: 1,
                    skewX: 0,
                    filter: "blur(0px)",
                    duration: 0.2,
                    ease: "power2.out"
                }
            );
        }

    }, { scope: sectionRef });

    return (
        <section className="morph-svg-section" ref={sectionRef}>
            <div className="morph-content">
                <h2 className="morph-title">Adaptive Arsenal</h2>
                <p className="morph-subtitle">Transformation Tech</p>
            </div>

            <div className="morph-svg-container">
                {/* Decorative Rings */}
                <div className="analysis-ring" style={{ width: '380px', height: '380px', border: '1px solid rgba(255,255,255,0.1)' }}></div>
                <div className="analysis-ring" style={{ width: '300px', height: '300px', animationDirection: 'reverse', animationDuration: '15s' }}></div>

                <div className="hologram-wrapper">
                    {/* Weapon Icon (Sniper-ish) */}
                    <div className="hologram-item active" ref={weaponRef}>
                        <svg width="200" height="200" viewBox="0 0 200 200">
                            <path className="weapon-path" d="M20,100 L180,100 M160,80 L180,100 L160,120 M40,80 L40,120 M80,100 L80,130 M120,70 L120,100" />
                            <rect x="50" y="90" width="100" height="20" className="weapon-path" />
                            <circle cx="100" cy="100" r="30" className="weapon-path" fill="none" strokeDasharray="5,5" />
                        </svg>
                        <div style={{ position: 'absolute', bottom: '-40px', color: 'cyan', fontFamily: 'monospace' }}>MODE: OFFENSE</div>
                    </div>

                    {/* Shield Icon */}
                    <div className="hologram-item" ref={shieldRef}>
                        <svg width="200" height="200" viewBox="0 0 200 200">
                            <path className="shield-path" d="M100,20 L170,50 V120 C170,160 100,190 100,190 C100,190 30,160 30,120 V50 L100,20 Z" />
                            <path className="shield-path" d="M100,40 V170 M50,70 H150" opacity="0.5" />
                        </svg>
                        <div style={{ position: 'absolute', bottom: '-40px', color: 'magenta', fontFamily: 'monospace' }}>MODE: DEFENSE</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// React.memo optimization
export default React.memo(MorphSVGSection);
