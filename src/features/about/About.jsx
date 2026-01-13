import React from 'react';
import PageHero from '../../components/ui/PageHero/PageHero';
import AboutMission from './components/AboutMission';
import AboutTimeline from './components/AboutTimeline';
import AboutCollective from './components/AboutCollective';
import AboutStats from './components/AboutStats';
import ScrollReveal from '../../components/ui/ScrollReveal/ScrollReveal';
import aboutHeroBg from '../../assets/images/about-hero.png';
import './About.css';

const About = () => {
    const timelineData = [
        { year: "2021", event: "Protocol Initialized. Core team assembled in Tokyo." },
        { year: "2023", event: "Series A Funding Secured. 'Project: Fiction' enters alpha." },
        { year: "2025", event: "Global Beta Launch. 1M+ active operatives." },
        { year: "2026", event: "Expansion to Sector 7. New IPs in development." }
    ];

    const teamData = [
        { name: "Alex Chen", role: "Director", avatar: "AC" },
        { name: "Sarah Lin", role: "Lead Audio", avatar: "SL" },
        { name: "Marcus V", role: "Art Lead", avatar: "MV" },
        { name: "Elena R", role: "Gameplay", avatar: "ER" }
    ];

    const statsData = [
        { label: "Operatives", value: "1,200,000+" },
        { label: "Regions", value: "4" },
        { label: "Uptime", value: "99.9%" }
    ];

    return (
        <div className="about-container">
            <PageHero
                title="WHO WE ARE"
                subtitle="FICTION STUDIOS"
                description="We are the architects of the new digital frontier. Building worlds that defy reality."
                backgroundImage={aboutHeroBg}
                alignment="left"
            />

            <ScrollReveal>
                <AboutMission />
            </ScrollReveal>

            <ScrollReveal className="section-spacer">
                <AboutTimeline timeline={timelineData} />
            </ScrollReveal>

            <ScrollReveal className="section-spacer" stagger={0.1}>
                <AboutCollective team={teamData} />
            </ScrollReveal>

            <ScrollReveal className="section-spacer">
                <AboutStats stats={statsData} />
            </ScrollReveal>
        </div>
    );
};

export default About;
