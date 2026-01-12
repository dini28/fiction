import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import './Newsletter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCheckCircle, faTowerBroadcast } from '@fortawesome/free-solid-svg-icons';

const Newsletter = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState('');
    const containerRef = useRef();

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(".newsletter-icon", {
            scale: 0,
            rotation: 180,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)"
        })
            .from(".newsletter-title", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                skewX: 10
            }, "-=0.6")
            .from(".newsletter-desc", {
                y: 20,
                opacity: 0,
                duration: 0.6
            }, "-=0.4")
            .from(".newsletter-form", {
                width: 0,
                opacity: 0,
                duration: 1,
                ease: "power4.inOut"
            }, "-=0.2");

        ScrollTrigger.refresh();

    }, { scope: containerRef });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            const tl = gsap.timeline();

            tl.to(".newsletter-content > *", {
                opacity: 0,
                y: -20,
                stagger: 0.1,
                duration: 0.4,
                onComplete: () => setIsSubmitted(true)
            });
        }
    };

    return (
        <section className="newsletter-section" ref={containerRef}>
            <div className="newsletter-content">
                {!isSubmitted ? (
                    <>
                        <h2 className="newsletter-title" data-text="SECURE THE DROPS">SECURE THE DROPS</h2>
                        <p className="newsletter-desc">Join the elite network for exclusive intel, prototype access, and priority transmission updates.</p>

                        <form className="newsletter-form" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder='ENTER OPERATOR EMAIL...'
                                className="newsletter-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="newsletter-btn">
                                <span className="btn-text">INITIALIZE</span>
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="success-message">
                        <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
                        <h2 className="success-title">UPLINK ESTABLISHED</h2>
                        <p className="success-desc">Intel frequency locked to: {email}. Prepare for immediate deployment.</p>
                        <button
                            className="reset-btn"
                            onClick={() => {
                                setIsSubmitted(false);
                                setEmail('');
                            }}
                        >
                            <span className="btn-text">RE-CONNECT ANOTHER TERMINAL</span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Newsletter;
