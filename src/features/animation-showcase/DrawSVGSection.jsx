import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';
import './DrawSVGSection.css';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const DrawSVGSection = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const pulseRef = useRef(null);

    useGSAP(() => {
        // --- 1. Main Drawing Animation (ScrollTrigger) ---
        const mainPath = document.querySelector('.main-circuit-path');
        const secondaryPaths = gsap.utils.toArray('.secondary-path');
        const nodes = gsap.utils.toArray('.hex-node');
        const labels = gsap.utils.toArray('.hex-label');

        // Prepare main path
        const length = mainPath.getTotalLength();
        gsap.set(mainPath, { strokeDasharray: length, strokeDashoffset: length });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center", // Start drawing when container hits center
                end: "bottom bottom", // Finish EXACTLY when bottom of container hits bottom of viewport
                scrub: 1, // Smooth scrubbing
            }
        });

        // Draw main path
        tl.to(mainPath, {
            strokeDashoffset: 0,
            ease: "none",
            duration: 10
        });

        // Reveal nodes progressively
        nodes.forEach((node, i) => {
            // Calculate progress point (rough approximation based on path length)
            // Ideally, you'd use getPointAtLength logic, but staggering works for now
            const progress = (i + 1) / (nodes.length + 1);

            tl.to(node, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.7)"
            }, progress * 9); // Insert at correct timeline spot

            tl.to(labels[i], {
                opacity: 1,
                y: 0,
                duration: 0.5
            }, progress * 9 + 0.2);
        });


        // --- 2. Infinite "Data Pulse" Animation ---
        if (pulseRef.current && mainPath) {
            gsap.to(pulseRef.current, {
                duration: 4,
                repeat: -1,
                ease: "power1.inOut",
                motionPath: {
                    path: mainPath,
                    align: mainPath,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: true
                }
            });
        }

        // --- 3. Interactive Parallax (Mouse Move) ---
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 20;
            const yPos = (clientY / window.innerHeight - 0.5) * 20;

            gsap.to('.svg-layer-back', { x: xPos * -1, y: yPos * -1, duration: 1 });
            gsap.to('.svg-layer-front', { x: xPos, y: yPos, duration: 1 });
        };

        window.addEventListener('mousemove', handleMouseMove);


        // --- 4. Secondary Circuit flicker ---
        secondaryPaths.forEach(path => {
            gsap.to(path, {
                opacity: "random(0.3, 1)", // Random flickers
                duration: "random(0.2, 2)",
                repeat: -1,
                yoyo: true,
                ease: "steps(2)"
            });
        });

        return () => window.removeEventListener('mousemove', handleMouseMove);

    }, { scope: sectionRef });

    return (
        <section className="draw-svg-section" ref={sectionRef}>
            <div className="draw-svg-content">
                <h2 className="draw-svg-title">SYSTEM BLUEPRINT</h2>
                <p className="draw-svg-subtitle">CORE ARCHITECTURE V2.0</p>
            </div>

            <div className="draw-svg-container" ref={containerRef}>
                <svg
                    className="svg-wrapper"
                    viewBox="0 0 1000 600"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ff4655" stopOpacity="0.2" />
                            <stop offset="50%" stopColor="#ff4655" stopOpacity="1" />
                            <stop offset="100%" stopColor="#ff4655" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>

                    {/* Background Decorative Circuits */}
                    <g className="svg-layer-back">
                        <path className="secondary-path" d="M50 500 H 200 V 450" stroke="rgba(255, 70, 85, 0.2)" strokeWidth="1" fill="none" />
                        <path className="secondary-path" d="M800 100 H 950 V 150" stroke="rgba(255, 70, 85, 0.2)" strokeWidth="1" fill="none" />
                        <rect x="50" y="50" width="10" height="10" fill="rgba(255, 70, 85, 0.1)" className="secondary-node" />
                        <rect x="940" y="540" width="10" height="10" fill="rgba(255, 70, 85, 0.1)" className="secondary-node" />
                    </g>

                    {/* Main Active Path */}
                    <g className="svg-layer-front">
                        {/* Guide Path (faint) */}
                        <path
                            d="M100 300 L 250 300 L 300 150 L 500 150 L 550 450 L 750 450 L 800 300 L 900 300"
                            stroke="rgba(255, 70, 85, 0.1)"
                            strokeWidth="2"
                            fill="none"
                        />

                        {/* Animated Drawing Path */}
                        <path
                            className="main-circuit-path"
                            d="M100 300 L 250 300 L 300 150 L 500 150 L 550 450 L 750 450 L 800 300 L 900 300"
                            stroke="url(#circuit-gradient)"
                            strokeWidth="3"
                            fill="none"
                            filter="url(#glow)"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Data Pulse Packet */}
                        <circle ref={pulseRef} r="6" fill="#fff" filter="url(#glow)" opacity="0.8" />

                        {/* Hex Nodes */}
                        <g transform="translate(250, 300)" className="hex-node" opacity="0" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                            <path d="M-10 -17 L10 -17 L20 0 L10 17 L-10 17 L-20 0 Z" fill="#050505" stroke="#ff4655" strokeWidth="2" />
                            <circle r="3" fill="#ff4655" />
                        </g>
                        <text x="250" y="340" textAnchor="middle" className="hex-label" opacity="0" fill="#fff" fontSize="12" fontFamily="Bruno Ace SC">SOURCE</text>

                        <g transform="translate(500, 150)" className="hex-node" opacity="0" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                            <path d="M-10 -17 L10 -17 L20 0 L10 17 L-10 17 L-20 0 Z" fill="#050505" stroke="#ff4655" strokeWidth="2" />
                            <circle r="3" fill="#ff4655" />
                        </g>
                        <text x="500" y="110" textAnchor="middle" className="hex-label" opacity="0" fill="#fff" fontSize="12" fontFamily="Bruno Ace SC">PROCESS</text>

                        <g transform="translate(550, 450)" className="hex-node" opacity="0" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                            <path d="M-10 -17 L10 -17 L20 0 L10 17 L-10 17 L-20 0 Z" fill="#050505" stroke="#ff4655" strokeWidth="2" />
                            <circle r="3" fill="#ff4655" />
                        </g>
                        <text x="550" y="490" textAnchor="middle" className="hex-label" opacity="0" fill="#fff" fontSize="12" fontFamily="Bruno Ace SC">ANALYZE</text>

                        <g transform="translate(800, 300)" className="hex-node" opacity="0" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                            <path d="M-10 -17 L10 -17 L20 0 L10 17 L-10 17 L-20 0 Z" fill="#050505" stroke="#ff4655" strokeWidth="2" />
                            <circle r="3" fill="#ff4655" />
                        </g>
                        <text x="800" y="340" textAnchor="middle" className="hex-label" opacity="0" fill="#fff" fontSize="12" fontFamily="Bruno Ace SC">OUTPUT</text>
                    </g>
                </svg>
            </div>
        </section>
    );
};

export default React.memo(DrawSVGSection);
