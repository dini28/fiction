import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVrCardboard, faNetworkWired, faDna } from '@fortawesome/free-solid-svg-icons';
import './FictionProtocol.css';

gsap.registerPlugin(ScrollTrigger);

const ProtocolCard = ({ title, subtitle, icon }) => {
    return (
        <div className="protocol-card">
            <div className="card-inner">
                <div className="card-front">
                    <div className="protocol-icon-wrapper">
                        <FontAwesomeIcon icon={icon} className="protocol-icon" />
                    </div>
                    <h3 className="protocol-title">{title}</h3>
                    <div className="protocol-line"></div>
                </div>
                <div className="card-back">
                    <h3 className="protocol-title-small">{title}</h3>
                    <p className="protocol-subtitle">{subtitle}</p>
                    <div className="card-corner top-left"></div>
                    <div className="card-corner bottom-right"></div>
                </div>
            </div>
        </div>
    );
};

const FictionProtocol = () => {
    const containerRef = useRef(null);

    const protocols = [
        {
            title: "Immersion Absolutism",
            subtitle: "We do not build games. We simulate realities. Every pixel, every sound wave must serve the illusion.",
            icon: faVrCardboard
        },
        {
            title: "Systemic Agency",
            subtitle: "Player choice is the only variable that matters. The world adapts to you, not the other way around.",
            icon: faNetworkWired
        },
        {
            title: "Narrative Architecture",
            subtitle: "The world itself is the story. Environmental storytelling that respects your intelligence.",
            icon: faDna
        }
    ];

    useGSAP(() => {
        const cards = gsap.utils.toArray('.protocol-card');

        gsap.from(cards, {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power4.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

    }, { scope: containerRef });

    return (
        <section className="fiction-protocol" ref={containerRef}>
            <div className="protocol-header">
                <span className="protocol-tag">CORE PHILOSOPHY</span>
                <h2 className="protocol-heading">The Fiction Protocol</h2>
            </div>
            <div className="protocol-grid">
                {protocols.map((item, index) => (
                    <ProtocolCard key={index} {...item} index={index} />
                ))}
            </div>
        </section>
    );
};

export default FictionProtocol;
