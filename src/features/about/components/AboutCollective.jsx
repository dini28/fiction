import { useRef } from 'react';

import SectionStart from '../../../components/ui/SectionStart';
import useKineticHover from '../../../hooks/useKineticHover';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const MemberCard = ({ member, index }) => {
    const cardRef = useKineticHover(10);

    return (
        <div className="personnel-card" ref={cardRef}>
            <div className="card-header">
                <span className="card-id">ID: 00{index + 1}</span>
                <span className="card-status">:: ACTIVE</span>
            </div>

            <div className="member-visual">
                <div className="profile-frame">
                    <div className="image-container">
                        <img src={member.avatar} alt={member.name} />
                    </div>
                    <div className="scan-overlay"></div>
                    <div className="corner-accent top-left"></div>
                    <div className="corner-accent bottom-right"></div>
                </div>
            </div>

            <div className="member-info">
                <h4 className="member-name">{member.name}</h4>
                <p className="member-role">{member.role}</p>
                <div className="card-details">
                    <span className="detail-item">SEC_LVL: 4</span>
                    <span className="detail-item">UNIT: CORE</span>
                </div>
            </div>
        </div>
    );
};

const AboutCollective = ({ team = [] }) => {
    const containerRef = useRef(null);

    useGSAP(() => {
        if (!team.length) return;
        ScrollTrigger.refresh();
        ScrollTrigger.batch(".personnel-card", {
            onEnter: batch => gsap.to(batch, {
                opacity: 1,
                y: 0,
                stagger: { each: 0.1, grid: [1, 4] },
                overwrite: true
            }),

            onLeave: batch => gsap.set(batch, { opacity: 0, y: -40, overwrite: true }),
            onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1, overwrite: true }),
            onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: 40, overwrite: true }),
            start: "top 85%",
        });

        // Set initial state immediately
        gsap.set(".personnel-card", { opacity: 0, y: 40 });

    }, { scope: containerRef, dependencies: [team] });

    return (
        <section className="about-collective" ref={containerRef}>
            <SectionStart title="THE COLLECTIVE" subtitle="TEAM" />
            <div className="team-grid">
                {team.map((member, index) => (
                    <MemberCard key={index} member={member} index={index} />
                ))}
            </div>
        </section>
    );
};

export default AboutCollective;
