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
                <div className="analysis-ring" style={{ width: '380px', height: '380px', border: '1px dashed rgba(255,255,255,0.2)' }}></div>
                <div className="analysis-ring" style={{ width: '300px', height: '300px', animationDirection: 'reverse', animationDuration: '15s' }}></div>

                <div className="hologram-wrapper">
                    {/* Start Icon: Armor (Fits 'Armory' / Apparel) */}
                    <div className="hologram-item active" ref={weaponRef}>
                        <svg width="200" height="200" viewBox="0 0 200 200">
                            {/* Chestplate Main */}
                            <path className="weapon-path" d="M50,40 L150,40 L170,80 L150,160 L100,180 L50,160 L30,80 Z" fill="none" />
                            {/* Neck/Collar */}
                            <path className="weapon-path" d="M70,40 L70,60 L130,60 L130,40" />
                            {/* Core Crystal */}
                            <circle cx="100" cy="90" r="15" className="weapon-path" fill="none" />
                            {/* Ab Ribs */}
                            <path className="weapon-path" d="M70,120 L130,120 M80,140 L120,140" opacity="0.7" />
                            {/* Shoulders */}
                            <path className="weapon-path" d="M30,80 L10,60 M170,80 L190,60" strokeDasharray="5,5" />
                        </svg>
                        <div style={{ position: 'absolute', bottom: '-40px', color: 'cyan', fontFamily: 'monospace' }}>SYSTEM: ARMOR</div>
                    </div>

                    {/* End Icon: Weapon (Fits 'Arsenal') */}
                    <div className="hologram-item" ref={shieldRef}>
                        <svg width="200" height="200" viewBox="0 0 200 200">
                            {/* Main Body */}
                            <path className="shield-path" d="M30,110 L50,110 L60,80 L140,80 L150,95 L180,95 L180,105 L150,105 L150,120 L130,140 L80,140 L70,120 L30,120 Z" fill="none" />
                            {/* Barrel Detail */}
                            <path className="shield-path" d="M150,100 L180,100" />
                            {/* Scope/Top Rail */}
                            <path className="shield-path" d="M70,70 L130,70 L135,80 M70,70 L65,80" />
                            {/* Trigger Guard */}
                            <path className="shield-path" d="M90,120 L90,130 L110,130 L110,120" />
                        </svg>
                        <div style={{ position: 'absolute', bottom: '-40px', color: 'magenta', fontFamily: 'monospace' }}>SYSTEM: WEAPON</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// React.memo optimization
export default React.memo(MorphSVGSection);
