const AboutCollective = ({ members = [] }) => {
    return (
        <div className="about-team">
            <h3 className="section-small-title">THE COLLECTIVE / ACTIVE UNITS</h3>
            <div className="team-grid">
                {members.map((member, index) => (
                    <div key={index} className="team-member">
                        <div className="member-avatar">
                            <span className="avatar-glitch">{member.avatar}</span>
                        </div>
                        <div className="member-info">
                            <h4 className="member-name">{member.name}</h4>
                            <p className="member-role">{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutCollective;
