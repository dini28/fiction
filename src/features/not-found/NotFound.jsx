import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import './NotFound.css';

const NotFound = () => {
    const containerRef = useRef();

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(".error-code",
            { scale: 1.5, opacity: 0, filter: "blur(10px)" },
            { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power4.out" }
        )
            .fromTo(".error-message",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5 }, "-=0.2"
            )
            .fromTo(".home-btn",
                { opacity: 0 },
                { opacity: 1, duration: 0.5 }, "-=0.2"
            );

    }, []);

    return (
        <div className="not-found-container" ref={containerRef}>
            <div className="noise-overlay"></div>
            <div className="error-content">
                <h1 className="error-code" data-text="404">404</h1>
                <div className="error-divider"></div>
                <h2 className="error-message">
                    SIGNAL LOST // <span className="highlight">SYSTEM FAILURE</span>
                </h2>
                <p className="error-desc">
                    The sector you are trying to access does not exist or has been corrupted.
                </p>
                <Link to="/" className="home-btn">
                    <span className="btn-glitch"></span>
                    <span className="btn-text">INITIATE REBOOT</span>
                </Link>
            </div>
            <div className="scanline"></div>
        </div>
    );
};

export default NotFound;
