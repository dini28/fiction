import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faBolt, faGhost, faEye, faFire } from '@fortawesome/free-solid-svg-icons';
import './CharacterShowcase.css';

import Titan from '../../../assets/images/character/Titan.png';
import Wraith from '../../../assets/images/character/Wraith.png';
import Volt from '../../../assets/images/character/Volt.png';
import Oracle from '../../../assets/images/character/Oracle.png';
import Ember from '../../../assets/images/character/Ember.png';



const characters = [
    {
        id: 1,
        name: "TITAN",
        role: "VANGUARD",
        desc: "Unstoppable force meets immovable object.",
        icon: faShieldAlt,
        image: Titan, // Heavy sci-fi armor
        color: "#c89b3c" // Gold
    },
    {
        id: 2,
        name: "WRAITH",
        role: "ASSASSIN",
        desc: "Death from the shadows, unseen.",
        icon: faGhost,
        image: Wraith, // Cyber assassin
        color: "#ff4655" // Neon Red
    },
    {
        id: 3,
        name: "VOLT",
        role: "SPEEDSTER",
        desc: "Faster than the speed of light.",
        icon: faBolt,
        image: Volt, // Futuristic speed suit
        color: "#00f0ff" // Cyan
    },
    {
        id: 4,
        name: "ORACLE",
        role: "TACTICIAN",
        desc: "Sees every outcome before the battle begins.",
        icon: faEye,
        image: Oracle, // Holographic seer
        color: "#7b61ff" // Mystic Violet
    },
    {
        id: 5,
        name: "EMBER",
        role: "CATALYST",
        desc: "Turns chaos into controlled destruction.",
        icon: faFire,
        image: Ember, // Elemental fire warrior
        color: "#ff8c42" // Burning Orange
    }
];

const CharacterShowcase = () => {
    const containerRef = useRef(null);
    const triggerRef = useRef(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const sections = gsap.utils.toArray('.char-panel');
        const totalPanels = sections.length;

        if (totalPanels === 0) return;

        // Horizontal Scroll Animation
        // Animate the container to move left by (totalPanels - 1) widths
        // Since container width is totalPanels * 100vw, we move it by -(totalPanels-1)/totalPanels * 100%

        gsap.to(containerRef.current, {
            xPercent: -100 * (totalPanels - 1) / totalPanels,
            ease: "none",
            scrollTrigger: {
                trigger: triggerRef.current,
                pin: true,
                scrub: 1,
                // Use a function for 'end' to ensure it calculates after layout
                end: () => "+=" + (containerRef.current ? containerRef.current.offsetWidth : 3000),
                snap: 1 / (totalPanels - 1),
                invalidateOnRefresh: true
            }
        });

        // Parallax effects for text inside each panel
        sections.forEach((section) => {
            const text = section.querySelector('.char-info');
            const img = section.querySelector('.char-img');

            // animate text slightly faster/different than container for depth? 
            // Actually, for horizontal scroll, we can animate elements when they come into view
            // But since we are moving the container, global scrollTrigger triggers based on horizontal pos?
            // Easier: Just let the pin handle the view. Maybe parallax the background image position.

            gsap.fromTo(img,
                { backgroundPosition: "0% 50%" },
                {
                    backgroundPosition: "100% 50%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top top",
                        end: "+=3000",
                        scrub: true
                    }
                }
            );
        });

    }, { scope: containerRef });

    return (
        <section className="char-showcase-wrapper" ref={triggerRef}>
            <div className="char-showcase-container" ref={containerRef}>
                <div className="char-intro-panel char-panel">
                    <div className="char-intro-content">
                        <h2>CHOOSE YOUR<br /><span className="highlight">CHAMPION</span></h2>
                        <p>Three Distinct Classes. Infinite Possibilities.</p>
                        <div className="scroll-indicator">
                            SCROLL TO EXPLORE &rarr;
                        </div>
                    </div>
                </div>

                {characters.map((char) => (
                    <div className="char-panel" key={char.id}>
                        <div
                            className="char-img"
                            style={{ backgroundImage: `url(${char.image})` }}
                        ></div>
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
