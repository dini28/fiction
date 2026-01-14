import AboutMission from './components/AboutMission';
import AboutTimeline from './components/AboutTimeline';
import AboutCollective from './components/AboutCollective';
import AboutStats from './components/AboutStats';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
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
            <div className="section-spacer">
                <AboutMission />
            </div>

            <div className="section-spacer">
                <AboutTimeline timeline={timelineData} />
            </div>

            <div className="section-spacer">
                <AboutCollective team={teamData} />
            </div>

            <div className="section-spacer">
                <AboutStats stats={statsData} />
            </div>
        </div>
    );
};

export default About;
