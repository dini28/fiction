import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import SectionStart from '../../../components/ui/SectionStart';
import gsap from 'gsap';
import useKineticHover from '../../../hooks/useKineticHover';

const MemberCard = ({ member, index }) => {
    const cardRef = useKineticHover(10);
    
    // Split name for initials if no avatar image provided
    const initials = member.name.split(' ').map(n => n[0]).join('').substring(0, 2);

    return (
        <div className="personnel-card" ref={cardRef}>
            <div className="card-header">
                <span className="card-id">ID: 00{index + 1}</span>
                <span className="card-status">:: ACTIVE</span>
            </div>
            
            <div className="member-visual">
                <div className="profile-frame">
                    {member.avatar ? (
                         <span className="avatar-content">{member.avatar}</span>
                    ) : (
                        <div className="avatar-placeholder">{initials}</div>
                    )}
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
        gsap.from(".personnel-card", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        });
    }, { scope: containerRef });

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
