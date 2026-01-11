import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faXTwitter, faInstagram, faDiscord,
    faLinkedin, faFacebook, faYoutube
} from '@fortawesome/free-brands-svg-icons';
import logo_white from '../../../assets/branding/logo_white.svg';
import logo from '../../../assets/branding/logo.svg';
import './Footer.css';
import { useState } from 'react';

const Footer = () => {
    const [isHovered, setIsHovered] = useState(false);

    const mainLinks = [
        { label: "WHO WE ARE", path: "/about" },
        { label: "WORK WITH US", path: "/careers" },
        { label: "NEWS", path: "/news" }
    ];

    const navLinks = [
        "PRESS", "SECURITY", "LEGAL", "LEADERSHIP",
        "CANDIDATE PRIVACY", "TERMS OF SERVICE", "PRIVACY NOTICE",
        "PLAYER SUPPORT", "E-VERIFY", "ACCESSIBILITY",
        "ANNUAL REPORTS", "PEERING INFORMATION"
    ];

    const socialIcons = [
        { icon: faXTwitter, label: "Twitter" },
        { icon: faInstagram, label: "Instagram" },
        { icon: faDiscord, label: "Discord" },
        { icon: faLinkedin, label: "LinkedIn" },
        { icon: faFacebook, label: "Facebook" },
        { icon: faYoutube, label: "YouTube" },
    ];

    const scrollToTop = (e) => {
        if (window.location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-main">
                        <div className="footer-left">
                            <div className="footer-logo">
                                <Link to="/">
                                    <img
                                        src={isHovered ? logo : logo_white}
                                        alt="Fiction Games Logo"
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                    />
                                </Link>
                                <p className="logo-text">
                                    Fiction <span> games </span>
                                </p>
                            </div>

                            <nav className="footer-nav">
                                {mainLinks.map((link) => (
                                    <Link key={link.label} to={link.path}>
                                        {link.label}
                                    </Link>
                                ))}
                                {navLinks.map((link) => (
                                    <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>
                                        {link}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        <div className="footer-socials">
                            {socialIcons.map((social, index) => (
                                <a key={index} href="#" aria-label={social.label}>
                                    <FontAwesomeIcon icon={social.icon} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <div className="footer-legal">
                            <a href="#">Cookie Preferences</a>
                            <p> | </p>
                            <span>© {new Date().getFullYear()} <span className='logo'> Fiction </span> Games, Inc. All Rights Reserved.</span>
                        </div>
                        <a href="#top" className="footer-back" onClick={scrollToTop}>
                            TO THE SURFACE <span>▲</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;