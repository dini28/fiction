import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faBolt, faGhost, faEye, faFire } from '@fortawesome/free-solid-svg-icons';
import './CharacterShowcase.css';

import fortress from '../../assets/images/characters/fortress.webp';
import phantom from '../../assets/images/characters/phantom.webp';
import surge from '../../assets/images/characters/surge.webp';
import nexus from '../../assets/images/characters/nexus.webp';
import inferno from '../../assets/images/characters/inferno.webp';



const characters = [
    {
        id: 1,
        name: "FORTRESS",
        role: "VANGUARD",
        desc: "Front-line anchor who absorbs damage like a MOBA tank, creating space for the team while controlling objectives.",
        icon: faShieldAlt,
        image: fortress,
        color: "#c89b3c"
    },
    {
        id: 2,
        name: "PHANTOM",
        role: "ASSASSIN",
        desc: "Stealth operative who stalks targets through the shadows, eliminating high-value enemies with precision like a tactical shooter ghost.",
        icon: faGhost,
        image: phantom,
        color: "#ff4655"
    },
    {
        id: 3,
        name: "SURGE",
        role: "SPEEDSTER",
        desc: "Hyper-mobile runner who blitzes across the battlefield with FPS movement mechanics, flanking and repositioning instantly.",
        icon: faBolt,
        image: surge,
        color: "#00f0ff"
    },
    {
        id: 4,
        name: "NEXUS",
        role: "TACTICIAN",
        desc: "Strategic mastermind who reads the battlefield like an RTS commander, predicting enemy movements and countering plays.",
        icon: faEye,
        image: nexus,
        color: "#7b61ff"
    },
    {
        id: 5,
        name: "INFERNO",
        role: "CATALYST",
        desc: "Elemental brawler who chains devastating combos like a fighting game character, turning momentum into explosive finishers.",
        icon: faFire,
        image: inferno,
        color: "#ff8c42"
    }
];

const CharacterShowcase = () => {
    const containerRef = useRef(null);
    const triggerRef = useRef(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
            const sections = gsap.utils.toArray('.char-panel');
            const totalPanels = sections.length;

            if (totalPanels === 0) return;

            // Horizontal Scroll Animation
            gsap.to(containerRef.current, {
                xPercent: -100 * (totalPanels - 1) / totalPanels,
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + (containerRef.current ? containerRef.current.offsetWidth : 3000),
                    snap: 1 / (totalPanels - 1),
                    invalidateOnRefresh: true,
                    id: "horizontalScroll"
                }
            });

            // Parallax effects for images (Translate X instead of background position)
            sections.forEach((section) => {
                const img = section.querySelector('img');
                if (img) {
                    gsap.fromTo(img,
                        { x: -50 },
                        {
                            x: 50,
                            ease: "none",
                            scrollTrigger: {
                                trigger: section,
                                containerAnimation: gsap.getById("horizontalScroll"), // If we named it, but here we can just scrub
                                start: "left right",
                                end: "right left",
                                scrub: true
                            }
                        }
                    );
                }
            });
        });

        mm.add("(max-width: 768px)", () => {
            const panels = gsap.utils.toArray('.char-panel:not(.char-intro-panel)');

            panels.forEach((panel) => {
                const info = panel.querySelector('.char-info');

                gsap.fromTo(info,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        scrollTrigger: {
                            trigger: panel,
                            start: "top 80%",
                            end: "top 20%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        });


        // Scroll Indicator Pulse
        gsap.to(".scroll-indicator", {
            y: 10,
            opacity: 0.5,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, { scope: containerRef });

    return (
        <section className="char-showcase-wrapper" ref={triggerRef}>
            <div className="char-showcase-container" ref={containerRef}>
                <div className="char-intro-panel char-panel">
                    <div className="char-intro-content">
                        <h2>CHOOSE YOUR<br /><span className="highlight">CHAMPION</span></h2>
                        <p>Distinct Classes. Infinite Possibilities.</p>
                        <div className="scroll-indicator">
                            <span className="desktop-text">SCROLL TO EXPLORE &rarr;</span>
                            <span className="mobile-text">SCROLL DOWN TO EXPLORE &darr;</span>
                        </div>
                    </div>
                </div>

                {characters.map((char) => (
                    <div className="char-panel" key={char.id}>
                        <div className="char-visual">
                            <img src={char.image} alt={char.name} className="char-img" />
                        </div>
                        <div className="char-overlay"></div>
                        <div className="char-info">
                            <div className="char-role-icon" style={{ color: char.color }}>
                                <FontAwesomeIcon icon={char.icon} />
                            </div>
                            <h3 className="char-name">{char.name}</h3>
                            <div className="char-role" style={{ borderColor: char.color, color: char.color }}>
                                {char.role}
                            </div>
                            <p className="char-desc">{char.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CharacterShowcase;
