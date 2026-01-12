import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faX } from '@fortawesome/free-solid-svg-icons';
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
            { img: discover, text: 'Discover amazing gaming experiences' },
            { img: join, text: 'Join millions of players worldwide' }
        ],
        isSingle: false
    });

    const dropdownRef = useRef(null);
    const dropdownButtonRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isDropdownOpen) {
            document.body.style.overflow = 'hidden';
            const handleEscape = (e) => {
                if (e.key === 'Escape') setIsDropdownOpen(false);
            };
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        } else {
            document.body.style.overflow = '';
        }
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

        if (isDropdownOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen]);

    const gamesData = [
        { name: 'Aethelgard: The Rift', image: Aethelgard, text: 'The city of Aethelgard.' },
        { name: 'Obsidian Edge', image: Obsidian, text: 'A dark, crumbling kingdom.' },
        { name: 'Neon Pulse', image: '', text: 'A sprawling, neon-soaked metropolis.' },
        { name: 'Cinder Crown', image: 'https://via.placeholder.com/400x200/1f4788/ffffff?text=Cinder+Crown', text: 'A frozen wasteland.' },
        { name: 'Vector Blade', image: 'https://via.placeholder.com/400x200/0ac8b9/ffffff?text=Vector+Blade', text: 'A minimalist, digital dimension.' },
        { name: 'Titan\'s Wake', image: 'https://via.placeholder.com/400x200/f9ca24/ffffff?text=Titan\'s+Wake', text: 'The entire game takes place on a Titan.' },
        { name: 'Spectral Breach', image: 'https://via.placeholder.com/400x200/8e44ad/ffffff?text=Spectral+Breach', text: 'A Victorian-style city haunted by spirits.' }
    ];

    const businessData = [
        { name: 'FICTION GAMES', image: fictiongames, text: 'Discover amazing gaming experiences' },
        { name: 'FICTION CONTACT', image: fictioncontact, text: 'Join millions of players worldwide' },
        { name: 'FICTION SUPPORT', image: fictionsupport, text: 'Customer support center' },
        { name: 'FICTION MERCH', image: fictionmerch, text: 'Official merchandise' }
    ];

    const handleLinkHover = (image, text) => {
        if (!image) return;
        setFeaturedData({ images: [{ img: image, text: text }], isSingle: true });
    };

    const handleLinkLeave = () => {
        setFeaturedData({
            images: [
                { img: discover, text: 'Discover amazing gaming experiences' },
                { img: join, text: 'Join millions of players worldwide' }
            ],
            isSingle: false
        });
    };

    return (
        <>
            <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="header-container">
                    <div className="left-section">
                        <div className="logo">
                            <Link to="/" aria-label="Home">
                                <img src={logo_white} alt="Fiction Logo" />
                                <h4>Fiction</h4>
                            </Link>
                        </div>

                        <button
                            ref={dropdownButtonRef}
                            className="dropdown-trigger"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            aria-expanded={isDropdownOpen}
                            aria-haspopup="true"
                        >
                            <img src={logo} alt="logo" aria-hidden="true" />
                            <span>Explorer</span>
                            <FontAwesomeIcon icon={faChevronDown} className={`fa-xs ${isDropdownOpen ? 'fa-rotate-180' : ''}`} style={{ transition: 'transform 0.3s' }} />
                        </button>
                    </div>

                    <nav className="center-section" aria-label="Main navigation">
                        <Link to="/about" className="nav-item">Who We Are</Link>
                        <Link to="/careers" className="nav-item">Work With Us</Link>
                        <Link to="/news" className="nav-item">News</Link>
                        <Link to="/armory" className="nav-item">Armory</Link>
                    </nav>

                    <div className="right-section">
                        <Link to="/login" className="sign-in-link">
                            Sign In
                        </Link>
                        <button
                            className="mobile-toggle"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            <FontAwesomeIcon icon={isMobileMenuOpen ? faX : faBars} />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`} aria-label="Mobile navigation">
                    <Link to="/about" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Who We Are</Link>
                    <Link to="/careers" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Work With Us</Link>
                    <Link to="/news" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>News</Link>
                    <Link to="/armory" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Armory</Link>
                    <Link to="/login" className="mobile-nav-link mobile-sign-in" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                </nav>
            </header>

            {/* Dropdown Overlay */}
            {isDropdownOpen && (
                <div className="dropdown-backdrop" onClick={() => setIsDropdownOpen(false)} aria-hidden="true" />
            )}

            {/* Mega Menu Dropdown */}
            <div
                ref={dropdownRef}
                className={`dropdown-menu ${isDropdownOpen ? 'active' : ''}`}
                role="menu"
                aria-hidden={!isDropdownOpen}
            >
                <button className="close-dropdown-btn" onClick={() => setIsDropdownOpen(false)} aria-label="Close menu">
                    <FontAwesomeIcon icon={faX} />
                </button>

                <div className="dropdown-wrapper">
                    <div className="dropdown-links">
                        <div className="dropdown-column">
                            <span className="dropdown-section-title">Games</span>
                            <ul className="dropdown-link-list">
                                {gamesData.map((game, i) => (
                                    <li key={i}>
                                        <a
                                            href="#games"
                                            className="dropdown-link"
                                            onMouseEnter={() => handleLinkHover(game.image, game.text)}
                                            onMouseLeave={handleLinkLeave}
                                        >
                                            {game.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="dropdown-column">
                            <span className="dropdown-section-title">Forge</span>
                            <ul className="dropdown-link-list">
                                <li><a href="#forge" className="dropdown-link">Conv/rgence</a></li>
                                <li><a href="#forge" className="dropdown-link">Hextech Mayhem</a></li>
                                <li><a href="#forge" className="dropdown-link">The Mageseeker</a></li>
                            </ul>

                            <div style={{ marginTop: '2rem' }}></div>
                            <span className="dropdown-section-title">Esports</span>
                            <ul className="dropdown-link-list">
                                <li><a href="#esports" className="dropdown-link">LoL Esports</a></li>
                                <li><a href="#esports" className="dropdown-link">Valorant Esports</a></li>
                            </ul>
                        </div>

                        <div className="dropdown-column">
                            <span className="dropdown-section-title">Entertainment</span>
                            <ul className="dropdown-link-list">
                                <li><a href="#arcane" className="dropdown-link">Arcane</a></li>
                                <li><a href="#music" className="dropdown-link">Music</a></li>
                            </ul>

                            <div style={{ marginTop: '2rem' }}></div>
                            <span className="dropdown-section-title">Business</span>
                            <ul className="dropdown-link-list">
                                {businessData.map((biz, i) => (
                                    <li key={i}>
                                        <a
                                            href="#business"
                                            className="dropdown-link"
                                            onMouseEnter={() => handleLinkHover(biz.image, biz.text)}
                                            onMouseLeave={handleLinkLeave}
                                        >
                                            {biz.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="dropdown-featured hidden-mobile">
                        <div className="dropdown-section-title">Featured</div>
                        {featuredData.isSingle ? (
                            <div className="featured-card">
                                <img src={featuredData.images[0].img} alt="Featured" />
                                <div className="featured-info">
                                    <p>{featuredData.images[0].text}</p>
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', width: '100%' }}>
                                {featuredData.images.map((item, idx) => (
                                    <div key={idx} className="featured-card" style={{ flex: 1 }}>
                                        <img src={item.img} alt="Featured" />
                                        <div className="featured-info">
                                            <p>{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;