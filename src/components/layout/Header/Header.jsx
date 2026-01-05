import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/branding/logo.svg';
import logo_white from '../../../assets/branding/logo_white.svg';
import './Header.css';

import discover from '../../../assets/images/discover.webp';
import join from '../../../assets/images/join.webp';

import Aethelgard from '../../../assets/images/games/Aethelgard.png';
import Obsidian from '../../../assets/images/games/Obsidian.webp';

import fictiongames from '../../../assets/images/business/fictiongames.webp';
import fictioncontact from '../../../assets/images/business/fictioncontact.webp';
import fictionsupport from '../../../assets/images/business/fictionsupport.webp';
import fictionmerch from '../../../assets/images/business/fictionmerch.webp';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [featuredData, setFeaturedData] = useState({
        images: [
            {
                img: discover,
                text: 'Discover amazing gaming experiences'
            },
            {
                img: join,
                text: 'Join millions of players worldwide'
            }
        ],
        isSingle: false
    });

    const dropdownRef = useRef(null);
    const dropdownButtonRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isDropdownOpen) {
                setIsDropdownOpen(false);
                dropdownButtonRef.current?.focus();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isDropdownOpen]);

    useEffect(() => {
        if (isDropdownOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isDropdownOpen]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isDropdownOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target) &&
                dropdownButtonRef.current &&
                !dropdownButtonRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const gamesData = [
        {
            name: 'Aethelgard: The Rift',
            image: Aethelgard,
            text: 'The city of Aethelgard, which exists simultaneously in its golden age (The Past) and its decaying ruins (The Future).'
        },
        {
            name: 'Obsidian Edge',
            image: Obsidian,
            text: 'A dark, crumbling kingdom buried under a permanent eclipse. The only light comes from the glowing runes on your sword.'
        },
        {
            name: 'Neon Pulse',
            image: '',
            text: 'A sprawling, neon-soaked metropolis controlled by a central AI called "The Architect."'
        },
        {
            name: 'Cinder Crown',
            image: 'https://via.placeholder.com/400x200/1f4788/ffffff?text=Cinder+Crown',
            text: 'A frozen wasteland called The Ever-Frost, where the sun has gone out.'
        },
        {
            name: 'Vector Blade',
            image: 'https://via.placeholder.com/400x200/0ac8b9/ffffff?text=Vector+Blade',
            text: 'A minimalist, digital dimension where everything is made of sharp geometric shapes and vibrant light.'
        },
        {
            name: 'Titan\'s Wake',
            image: 'https://via.placeholder.com/400x200/f9ca24/ffffff?text=Titan\'s+Wake',
            text: 'The entire game takes place on the back of a "World-Titan"—a creature the size of a continent that is slowly waking up.'
        },
        {
            name: 'Spectral Breach',
            image: 'https://via.placeholder.com/400x200/8e44ad/ffffff?text=Spectral+Breach',
            text: 'A Victorian-style city haunted by spirits that have crossed over from the "Glow."'
        }
    ];

    const businessData = [
        {
            name: 'FICTION GAMES',
            image: fictiongames,
            text: 'Discover amazing gaming experiences'
        },
        {
            name: 'FICTION CONTACT',
            image: fictioncontact,
            text: 'Join millions of players worldwide'
        },
        {
            name: 'FICTION SUPPORT',
            image: fictionsupport,
            text: 'A Victorian-style city haunted by spirits that have crossed over from the "Glow."'
        },
        {
            name: 'FICTION MERCH',
            image: fictionmerch,
            text: 'A Victorian-style city haunted by spirits that have crossed over from the "Glow."'
        }
    ];

    const handleLinkHover = (image, text) => {
        setFeaturedData({
            images: [{ img: image, text: text }],
            isSingle: true
        });
    };

    const handleLinkLeave = () => {
        setFeaturedData({
            images: [
                {
                    img: discover,
                    text: 'Discover amazing gaming experiences'
                },
                {
                    img: join,
                    text: 'Join millions of players worldwide'
                }
            ],
            isSingle: false
        });
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    };

    const handleCloseDropdown = () => {
        setIsDropdownOpen(false);
        dropdownButtonRef.current?.focus();
    };

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (isDropdownOpen) {
            setIsDropdownOpen(false);
        }
    };

    return (
        <>
            {isDropdownOpen && (
                <div
                    className="dropdown-backdrop"
                    onClick={handleCloseDropdown}
                    aria-hidden="true"
                />
            )}

            <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="header-container">
                    <div className="left-section">
                        <div className="logo">
                            <a href="#home" aria-label="Home">
                                <img src={logo_white} alt="Fiction Logo" />
                                <h4>Fiction</h4>
                            </a>
                        </div>

                        <button
                            className="mobile-menu-toggle"
                            onClick={handleMobileMenuToggle}
                            aria-label="Toggle mobile menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <FontAwesomeIcon icon={isMobileMenuOpen ? faX : faBars} />
                        </button>

                        <div>
                            <button
                                ref={dropdownButtonRef}
                                className="dropdown-icon"
                                onClick={handleDropdownToggle}
                                aria-label="Games menu"
                                aria-expanded={isDropdownOpen}
                                aria-haspopup="true"
                            >
                                <img src={logo} alt="Fiction Logo" />
                                <FontAwesomeIcon icon={faChevronDown} />
                            </button>

                            <div
                                ref={dropdownRef}
                                className={`dropdown ${isDropdownOpen ? 'active' : ''}`}
                                role="menu"
                                aria-hidden={!isDropdownOpen}
                            >
                                <button
                                    className="close-btn"
                                    onClick={handleCloseDropdown}
                                    aria-label="Close menu"
                                >
                                    <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                                </button>
                                <div className="dropdown-container">
                                    <div className="dropdown-section">
                                        <h3>Games</h3>
                                        <ul role="list">
                                            {gamesData.map((game, index) => (
                                                <li key={index}>
                                                    <a
                                                        href="#games"
                                                        onMouseEnter={() => handleLinkHover(game.image, game.text)}
                                                        onMouseLeave={handleLinkLeave}
                                                        onFocus={() => handleLinkHover(game.image, game.text)}
                                                        onBlur={handleLinkLeave}
                                                        role="menuitem"
                                                    >
                                                        {game.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="dropdown-section">
                                        <h3>Forge</h3>
                                        <ul role="list">
                                            <li><a href="#forge" role="menuitem">CONV/RGENCE</a></li>
                                            <li><a href="#forge" role="menuitem">HEXTECH MAYHEM</a></li>
                                            <li><a href="#forge" role="menuitem">THE MAGESEEKER</a></li>
                                        </ul>

                                        <h3 className="section-spacing">Esports</h3>
                                        <ul role="list">
                                            <li><a href="#esports" role="menuitem">ESPORTS</a></li>
                                            <li><a href="#esports" role="menuitem">FICTION ESPORTS</a></li>
                                        </ul>
                                    </div>

                                    <div className="dropdown-section">
                                        <h3>Entertainment</h3>
                                        <ul role="list">
                                            <li><a href="#entertainment" role="menuitem">ARCANE</a></li>
                                            <li><a href="#entertainment" role="menuitem">UNIVERSE</a></li>
                                            <li><a href="#entertainment" role="menuitem">FICTION GAMES MUSIC</a></li>
                                        </ul>

                                        <h3 className="section-spacing">Business</h3>
                                        <ul role="list">
                                            {businessData.map((business, index) => (
                                                <li key={index}>
                                                    <a
                                                        href="#business"
                                                        onMouseEnter={() => handleLinkHover(business.image, business.text)}
                                                        onMouseLeave={handleLinkLeave}
                                                        onFocus={() => handleLinkHover(business.image, business.text)}
                                                        onBlur={handleLinkLeave}
                                                        role="menuitem"
                                                    >
                                                        {business.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="featured-section">
                                        {featuredData.isSingle ? (
                                            <div className="featured-card single">
                                                <img src={featuredData.images[0].img} alt="Featured game content" />
                                                <div className="featured-content">
                                                    <p>{featuredData.images[0].text}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="featured-cards-container">
                                                {featuredData.images.map((item, index) => (
                                                    <div key={index} className="featured-card">
                                                        <img src={item.img} alt={`Featured content ${index + 1}`} />
                                                        <div className="featured-content">
                                                            <p>{item.text}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <nav className="center-section" aria-label="Main navigation">
                        <a href="#about" className="nav-item">WHO WE ARE</a>
                        <a href="#careers" className="nav-item">WORK WITH US</a>
                        <a href="#news" className="nav-item">NEWS</a>
                    </nav>

                    <div className="right-section">
                        <div className="sign-in-container">
                            <button className="sign-in-btn">SIGN IN</button>
                        </div>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <nav className="mobile-menu" aria-label="Mobile navigation">
                        <a href="#about" className="mobile-nav-item">WHO WE ARE</a>
                        <a href="#careers" className="mobile-nav-item">WORK WITH US</a>
                        <a href="#news" className="mobile-nav-item">NEWS</a>
                    </nav>
                )}
            </header>
        </>
    );
};

export default Header;