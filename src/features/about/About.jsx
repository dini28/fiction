import React from 'react';
import AboutMission from './components/AboutMission';
import AboutTimeline from './components/AboutTimeline';
import AboutCollective from './components/AboutCollective';
import AboutStats from './components/AboutStats';
import './About.css';

const About = () => {
    const timelineData = [
        { year: "2023", event: "PROTOCOL INITIATED // STUDIO FOUNDED" },
        { year: "2024", event: "FIRST PROTOTYPE \"PROJECT: ECHO\" DEPLOYED" },
        { year: "2025", event: "SEED ROUND SECURED: $10M FUNDING" },
        { year: "2026", event: "GLOBAL OPS EXPANSION // TOKYO HQ OPENS" }
    ];

    const teamData = [
        { name: "ALEX CHEN", role: "GAME DIRECTOR", avatar: "AC" },
        { name: "SARAH VOSS", role: "ART LEAD", avatar: "SV" },
        { name: "DAVID KIM", role: "TECH DIRECTOR", avatar: "DK" },
        { name: "ELENA ROSS", role: "NARRATIVE LEAD", avatar: "ER" }
    ];

    return (
        <div className="about-container">
            <AboutMission />
            <AboutTimeline timeline={timelineData} />
            <AboutCollective members={teamData} />
            <AboutStats />
        </div>
    );
};

export default About;
