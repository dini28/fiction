import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faApple, faPlaystation, faXbox } from '@fortawesome/free-brands-svg-icons';
import gsap from 'gsap';
import './GameCard.css';

const GameCard = ({ game }) => {
    const cardRef = useRef(null);
    const contentRef = useRef(null);

    // Platform icon mapping
    const getPlatformIcon = (platform) => {
        if (typeof platform === 'string') {
            switch (platform.toLowerCase()) {
                case 'desktop': return faDesktop;
                case 'apple': return faApple;
                case 'mobile-alt': return faMobileAlt;
                case 'playstation': return faPlaystation;
                case 'xbox': return faXbox;
                default: return faDesktop;
            }
        }
        return platform; // It's already an icon object
    };

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();

        // Calculate mouse position relative to center of card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Rotate values (max 10deg)
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            duration: 0.5,
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.05,
            ease: "power2.out",
            transformPerspective: 1000,
            transformOrigin: "center"
        });

        // Parallax effect for content
        if (contentRef.current) {
            gsap.to(contentRef.current, {
                x: (x - centerX) / 10,
                y: (y - centerY) / 10,
                duration: 0.5
            });
        }
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            duration: 0.5,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            ease: "power2.out"
        });

        if (contentRef.current) {
            gsap.to(contentRef.current, {
                x: 0,
                y: 0,
                duration: 0.5
            });
        }
    };

    return (
        <div
            className="game-card"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="game-bg-wrapper">
                <img src={game.image} alt={game.name} className="game-bg" />
            </div>

            <div className="game-info" ref={contentRef}>
                <div className="game-logo-text">
                    {game.name}
                </div>

                {game.size === 'default' && (
                    <div className="platforms">
                        {game.platforms.map((platform, index) => (
                            <div key={index} className="platform-icon">
                                <FontAwesomeIcon icon={getPlatformIcon(platform)} />
                            </div>
                        ))}
                    </div>
                )}

                {game.genre && (
                    <div className="game-genre">{game.genre}</div>
                )}
            </div>

            {game.comingSoon && (
                <div className="coming-soon-badge">
                    {game.releaseDate || 'COMING SOON'}
                </div>
            )}
        </div>
    );
};

export default GameCard;
