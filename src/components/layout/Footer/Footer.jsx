import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faXTwitter, faInstagram, faDiscord,
    faLinkedin, faFacebook, faYoutube
} from '@fortawesome/free-brands-svg-icons';

import logo from '../../../assets/branding/logo.svg';
import { armoryData } from '../../../features/armory/data/ArmoryData';
import { useCart } from '../../../context/useCart';
import './Footer.css';

const studioLinks = [
    { label: "Who we are", to: "/about" },
    { label: "Work with us", to: "/careers" },
    { label: "News", to: "/news" }
];

const armoryLinks = [
    { label: "Shop all", to: "/armory" },
    ...armoryData.categories
        .filter(category => category.id !== 'all')
        .map(category => ({ label: category.label, to: `/armory?category=${category.id}` }))
];

const socialIcons = [
    { icon: faXTwitter, label: "X" },
    { icon: faInstagram, label: "Instagram" },
    { icon: faDiscord, label: "Discord" },
    { icon: faLinkedin, label: "LinkedIn" },
    { icon: faFacebook, label: "Facebook" },
    { icon: faYoutube, label: "YouTube" },
];

const Footer = () => {
    const { cartCount, openCart } = useCart();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-main">
                    <div className="footer-brand">
                        <Link to="/" aria-label="Fiction home" className="footer-logo-link">
                            <img src={logo} alt="" />
                            <h4>Fiction</h4>
                        </Link>
                        <ul className="footer-socials" aria-label="Social channels">
                            {socialIcons.map((social) => (
                                <li key={social.label} className="footer-social" title={social.label}>
                                    <FontAwesomeIcon icon={social.icon} aria-hidden="true" />
                                    <span className="visually-hidden">{social.label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <nav className="footer-columns" aria-label="Footer">
                        <div className="footer-column">
                            <h3 className="footer-heading">Studio</h3>
                            <ul>
                                {studioLinks.map(link => (
                                    <li key={link.to}>
                                        <Link to={link.to}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3 className="footer-heading">Armory</h3>
                            <ul>
                                {armoryLinks.map(link => (
                                    <li key={link.to}>
                                        <Link to={link.to} state={{ scrollTo: 'shop' }}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3 className="footer-heading">Account</h3>
                            <ul>
                                <li>
                                    <Link to="/login">Sign in</Link>
                                </li>
                                <li>
                                    <button type="button" onClick={openCart}>
                                        Cart{cartCount > 0 && ` (${cartCount})`}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                <div className="footer-bottom">
                    <p className="footer-legal">
                        © {new Date().getFullYear()} <span className="logo">Fiction</span> Games, Inc. All rights reserved.
                    </p>
                    <button type="button" className="footer-back" onClick={scrollToTop} aria-label="Back to top">
                        TO THE SURFACE <span aria-hidden="true">▲</span>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
