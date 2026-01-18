import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJedi, faHurricane, faPersonRunning, faShieldHalved, faPersonRifle } from '@fortawesome/free-solid-svg-icons';
import './CharacterShowcase.css';

import GravityShift from '../../assets/images/characters/GravityShift.png';
import ObsidianEdge from '../../assets/images/characters/ObsidianEdge.png';
import ShadowSector from '../../assets/images/characters/ShadowSector.png';
import StarTactics from '../../assets/images/characters/StarTactics.png';
import TitanWake from '../../assets/images/characters/TitanWake.png';



const characters = [
    {
        id: 1,
        name: "George",
        title: "STAR TACTICS",
        role: "GUARDIAN",
        desc: "A legendary spacefarer who has traversed the cosmos, bringing back technology and hope from the furthest reaches of the galaxy.",
        icon: faJedi,
        image: StarTactics,
        color: "#e2e3dd"
    },
    {
        id: 2,
        name: "Liam",
        title: "OBSIDIAN EDGE",
        role: "ASSASSIN",
        desc: "A master of the blade living the assassin's creed, stalking high-value targets from the shadows of the neon city.",
        icon: faHurricane,
        image: ObsidianEdge,
        color: "#ff8c42"
    },
    {
        id: 3,
        name: "Noah",
        title: "Gravity Shift",
        role: "SPEEDSTER",
        desc: "A legendary runner who conquered the Labyrinth of Gold, outsmarting traps and rivals to claim the ultimate prize.",
        icon: faPersonRunning,
        image: GravityShift,
        color: "#e1c283"
    },
    {
        id: 4,
        name: "Elijah",
        title: "Shadow Sector",
        role: "WARRIOR",
        desc: "A timeless warrior who bridges eras, wielding ancient combat mastery enhanced by modern warfare technology.",
        icon: faShieldHalved,
        image: ShadowSector,
        color: "#83afb6"
    },
    {
        id: 5,
        name: "Alfred",
        title: "TITAN WAKE",
        role: "SOLDIER",
        desc: "The planet's staunchest defender, a soldier dedicated to holding the line against the catastrophic Titan threat.",
        icon: faPersonRifle,
        image: TitanWake,
        color: "#e6b582"
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
                <div className="char-intro-panel">
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
                            <div className='char-info-header'>
                                <div className="char-role-icon" style={{ color: char.color }}>
                                    <FontAwesomeIcon icon={char.icon} />
                                </div>
                                <div className='char-info-header-text'>
                                    <h4 className="char-name">{char.name}</h4>
                                    <h5 className="char-title" style={{ color: char.color }}>{char.title}</h5>
                                </div>
                            </div>
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
