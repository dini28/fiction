import './Community.css';
import { communityData } from '../../../data/homeSectionsData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Community = () => {
    return (
        <section className="community-section">
            <div className="container">
                <div className="community-grid">
                    <div className="community-content">
                        <h2>
                            Join The <br />
                            <span>Squad</span>
                        </h2>
                        <p className="community-desc">{communityData.description}</p>
                        <div className="community-links">
                            {communityData.links.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    className={`community-btn ${link.primary ? 'primary' : 'secondary'}`}
                                >
                                    <FontAwesomeIcon icon={link.icon} />
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="stats-grid">
                        {communityData.stats.map((stat, index) => (
                            <div key={index} className={`stat-card ${index === 0 ? 'featured' : ''}`}>
                                <FontAwesomeIcon icon={stat.icon} className="stat-icon" />
                                <span className="stat-value">{stat.value}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Community;
