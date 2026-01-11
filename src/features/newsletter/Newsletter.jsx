import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Newsletter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Newsletter = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState('');
    const containerRef = useRef();

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 98%", // Trigger almost immediately when section enters
                toggleActions: "play none none none"
            }
        });

        tl.fromTo(".newsletter-icon",
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
        )
            .fromTo(".newsletter-title",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4 },
                "-=0.2"
            )
            .fromTo(".newsletter-desc",
                { y: 15, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4 },
                "-=0.2"
            )
            .fromTo(".newsletter-form",
                { y: 10, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", immediateRender: false },
                "-=0.2"
            );

    }, { scope: containerRef });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);

            gsap.from(".success-message", {
                scale: 0.8,
                opacity: 0,
                duration: 0.5,
                ease: "back.out(1.7)"
            });
        }
    };

    return (
        <section className="newsletter-section" ref={containerRef}>
            <div className="newsletter-content">
                {!isSubmitted ? (
                    <>
                        <FontAwesomeIcon icon={faEnvelope} className="newsletter-icon" />
                        <h2 className="newsletter-title" data-text="Get The Drops">Get The Drops</h2>
                        <p className="newsletter-desc">Subscribe to our newsletter for exclusive in-game items, beta keys, and the latest esports news.</p>

                        <form className="newsletter-form" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder='Enter your email'
                                className="newsletter-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="newsletter-btn">
                                <span className="btn-text">Subscribe</span>
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="success-message">
                        <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
                        <h2 className="success-title">Transmission Received</h2>
                        <p className="success-desc">Identity verified. Welcome to the inner circle, {email}.</p>
                        <button
                            className="reset-btn"
                            onClick={() => {
                                setIsSubmitted(false);
                                setEmail('');
                            }}
                        >
                            <span className="btn-text">Register another operator</span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Newsletter;
