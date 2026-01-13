import React from 'react';
import useKineticHover from '../../../hooks/useKineticHover';

const MemberCard = ({ member }) => {
    const cardRef = useKineticHover(20);

    return (
        <div className="team-member" ref={cardRef}>
            <div className="member-avatar">
                <span className="avatar-glitch">{member.avatar}</span>
            </div>
            <div className="member-info">
                <h4 className="member-name">{member.name}</h4>
                <p className="member-role">{member.role}</p>
            </div>
        </div>
    );
};

const AboutCollective = ({ team = [] }) => {
    return (
        <div className="about-collective">
            <h3 className="section-title">THE COLLECTIVE</h3>
            <div className="team-grid">
                {team.map((member, index) => (
                    <MemberCard key={index} member={member} />
                ))}
            </div>
        </div>
    );
};

export default AboutCollective;
