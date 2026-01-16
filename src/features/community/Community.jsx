import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import './Community.css';
import { communityData } from '../../data/homeSectionsData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Community = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });

        tl.from(".community-content h2", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        })
            .from(".community-desc", {
                x: -30,
                opacity: 0,
                duration: 0.8
            }, "-=0.6")
            .from(".community-btn", {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.2
            }, "-=0.4");

        ScrollTrigger.refresh();

        // 3D Card Effect
        const cards = gsap.utils.toArray('.community-stat-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const xc = rect.width / 2;
                const yc = rect.height / 2;
                const dx = x - xc;
                const dy = y - yc;

                gsap.to(card, {
                    duration: 0.5,
                    rotateY: dx / 15,
                    rotateX: -dy / 15,
                    scale: 1.05,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.5,
                    rotateY: 0,
                    rotateX: 0,
                    scale: 1,
                    ease: "power2.out"
                });
            });
        });

    }, { scope: containerRef });

    return (
        <section className="community-section" ref={containerRef}>
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

                    <div className="community-stats-grid">
                        {communityData.stats.map((stat, index) => (
                            <div key={index} className={`community-stat-card ${index === 0 ? 'featured' : ''}`}>
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
