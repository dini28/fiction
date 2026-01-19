import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faXTwitter, faInstagram, faDiscord,
    faLinkedin, faFacebook, faYoutube
} from '@fortawesome/free-brands-svg-icons';

import logo from '../../../assets/branding/logo.svg';
import './Footer.css';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);
    const typographyRef = useRef(null);

    useGSAP(() => {
        const chars = typographyRef.current.querySelectorAll('.char');

        // Entrance Animation
        gsap.fromTo(chars,
            {
                y: 50,
                opacity: 0,
                rotateX: -20,
            },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                stagger: {
                    amount: 0.5,
                    from: "start"
                },
                duration: 1.2,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 95%",
                    toggleActions: "play reverse play reverse"
                }
            }
        );

    }, { scope: footerRef });

    const mainLinks = [
        { label: "WHO WE ARE", path: "/about" },
        { label: "WORK WITH US", path: "/careers" },
        { label: "NEWS", path: "/news" },
        { label: "ARMORY", path: "/armory" }
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
        <footer className="footer" ref={footerRef}>
            <div className="footer-container">
                <div className="footer-typography" ref={typographyRef}>
                    {"Fiction".split("").map((char, index) => (
                        <span key={index} className="char">{char}</span>
                    ))}
                </div>

                <div className="footer-top">
                    <div className="footer-main">
                        <div className="footer-left">
                            <div className="footer-logo">
                                <Link to="/" aria-label="Home" className='footer-logo-link'>
                                    <img src={logo} alt="Fiction Logo" />
                                    <h4>Fiction</h4>
                                </Link>
                            </div>

                            <nav className="footer-nav">
                                {mainLinks.map((link) => (
                                    <Link key={link.label} to={link.path}>
                                        {link.label}
                                    </Link>
                                ))}
                                {navLinks.map((link) => (
                                    <Link key={link} to="/404">
                                        {link}
                                    </Link>
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
                            <Link to="/404">Cookie Preferences</Link>
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