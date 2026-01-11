import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHero from '../../components/ui/PageHero/PageHero';
import SectionMarquee from '../../components/ui/SectionMarquee/SectionMarquee';
import './About.css';

const About = () => {
    const sectionRef = useRef();
    const textRef = useRef();

    useGSAP(() => {
        // Mission Text
        gsap.from(".about-mission", {
            scrollTrigger: {
                trigger: ".about-mission",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.out"
        });

        // Value Cards
        gsap.from(".value-card", {
            scrollTrigger: {
                trigger: ".about-values",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 30,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out"
        });

        // Stats
        gsap.from(".stat-item", {
            scrollTrigger: {
                trigger: ".about-stats",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 40,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "back.out(1.7)"
        });

        // Timeline
        gsap.from(".timeline-item", {
            scrollTrigger: {
                trigger: ".about-origins",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            x: -30,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8
        });

        // Team / Collective
        gsap.from(".team-member", {
            scrollTrigger: {
                trigger: ".team-grid",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            scale: 0.9,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6
        });

        ScrollTrigger.refresh();
    }, { scope: sectionRef });

    const timeline = [
        { year: "2018", event: "THE GENESIS: Fiction Labs founded in a repurposed server farm in Neo-Tokyo, driven by a vision to merge narrative depth with arcade-speed mechanics." },
        { year: "2020", event: "PROJECT OBSIDIAN: Our debut extraction shooter shatters concurrent player records, introducing the 'Flow-State' combat system." },
        { year: "2022", event: "THE COLLECTIVE: We scale to 100+ decentralized operatives, proving that AAA games can be built without borders." },
        { year: "2024", event: "AETHELGARD PROTOCOL: Initiating our most ambitious metaverse project yet—a persistent, player-governed digital nation." }
    ];

    const team = [
        { role: "CEO / ARCHITECT", name: "KAELEN VOSS", avatar: "KV" },
        { role: "NARRATIVE DIRECTOR", name: "SORA CHEN", avatar: "SC" },
        { role: "CORE SYSTEMS LEAD", name: "MARCUS THORNE", avatar: "MT" },
        { role: "ART VISIONARY", name: "ELENA ROSSI", avatar: "ER" }
    ];

    return (
        <section id="about" className="about-section" ref={sectionRef}>
            <div className="about-container">
                <PageHero
                    title={<>ARCHITECTS OF <span className="highlight">IMAGINATION</span></>}
                    subtitle="WHO WE ARE"
                    description="We are not just developers; we are world-builders. Fiction operates at the bleeding edge of interactive entertainment, fusing visceral gameplay with stories that matter."
                />

                <div className="about-content">
                    <div className="about-main">
                        <p className="about-mission" ref={textRef}>
                            <span className="accent-text">MISSION LOG 2026:</span> We exist to push the boundaries of the medium.
                            In an industry often paralyzed by caution, we choose volatility. We build for the players who
                            crave complexity, speed, and soul. Our studio is a decentralized network of veterans
                            and prodigies, united by a single code: <span className="white-text">Make it unforgettable.</span>
                        </p>

                        <div className="about-values">
                            <div className="value-card">
                                <h3>Innovation</h3>
                                <p>Breaking technical boundaries to deliver the impossible.</p>
                            </div>
                            <div className="value-card">
                                <h3>Narrative</h3>
                                <p>Story-first development in everything we create.</p>
                            </div>
                        </div>
                    </div>

                    <div className="about-stats">
                        <div className="stat-item">
                            <span className="stat-number">45M</span>
                            <span className="stat-label">Active Players</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">200+</span>
                            <span className="stat-label">Global Artists</span>
                        </div>
                    </div>
                </div>

                <div className="section-spacer">
                    <SectionMarquee text="ORIGIN PARAMETERS • TIMELINE SYNC •" speed={1} />
                </div>

                <div className="about-origins">
                    <h3 className="section-small-title">OUR ORIGINS / SYSTEM LOGS</h3>
                    <div className="timeline-container">
                        {timeline.map((item, index) => (
                            <div key={index} className="timeline-item">
                                <span className="timeline-year">{item.year}</span>
                                <div className="timeline-line"></div>
                                <p className="timeline-event">{item.event}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="section-spacer">
                    <SectionMarquee text="THE COLLECTIVE • OPERATIVES •" speed={1.2} reverse />
                </div>

                <div className="about-team">
                    <h3 className="section-small-title">THE COLLECTIVE / ACTIVE UNITS</h3>
                    <div className="team-grid">
                        {team.map((member, index) => (
                            <div key={index} className="team-member">
                                <div className="member-avatar">
                                    <span className="avatar-glitch">{member.avatar}</span>
                                </div>
                                <h4 className="member-name">{member.name}</h4>
                                <p className="member-role">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="about-bg-elements">
                <div className="circuit-line"></div>
                <div className="circuit-line"></div>
            </div>
        </section>
    );
};

export default About;
