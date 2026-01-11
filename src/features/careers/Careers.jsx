import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import PageHero from '../../components/ui/PageHero/PageHero';
import SectionMarquee from '../../components/ui/SectionMarquee/SectionMarquee';
import './Careers.css';

const Careers = () => {
    const sectionRef = useRef();

    const jobs = [
        { title: "Senior Game Designer", type: "Full-Time", location: "Remote / Tokyo" },
        { title: "Technical Artist", type: "Contract", location: "Global" },
        { title: "Network Architect", type: "Full-Time", location: "San Francisco" },
        { title: "Narrative Liaison", type: "Full-Time", location: "Remote" }
    ];

    // Ensure content is visible if JS is slow/fails
    useGSAP(() => {
        gsap.set(".job-card, .benefit-card, .process-step", { autoAlpha: 1 }); // Reset first
        // Jobs Grid
        gsap.from(".job-card", {
            scrollTrigger: {
                trigger: ".jobs-grid",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power2.out"
        });

        // Benefits
        gsap.from(".benefit-card", {
            scrollTrigger: {
                trigger: ".benefits-grid",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            scale: 0.95,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out"
        });

        // Process Steps
        gsap.from(".process-step", {
            scrollTrigger: {
                trigger: ".process-map",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power2.out"
        });

        ScrollTrigger.refresh();
    }, { scope: sectionRef });

    const benefits = [
        { title: "RADICAL AUTONOMY", desc: "No clock-punching. No micromanagement. You own your output, your schedule, and your methods." },
        { title: "EQUITY BREACH", desc: "Every operative receives significant profit-sharing. We build together, we win together." },
        { title: "NEURAL GROWTH", desc: "Annual stipends for conferences, courses, and neural link upgrades (or just books)." },
        { title: "HARDWARE SYNC", desc: "Top-tier rig provided upon initiation. Keep it fresh, keep it fast." }
    ];

    const process = [
        { step: "01", title: "TRANSMISSION", desc: "Send us your portfolio. Show us the work that keeps you awake at night." },
        { step: "02", title: "TECH SCAN", desc: "A practical assessment of your craft. No whiteboard algorithms, just real problems." },
        { step: "03", title: "CULTURE SYNC", desc: "A conversation with the team to ensure our wavelengths align." },
        { step: "04", title: "INTEGRATION", desc: "Formal offer and onboarding. Welcome to the collective." }
    ];

    return (
        <section id="careers" className="careers-section" ref={sectionRef}>
            <div className="careers-container">
                <PageHero
                    title={<>INITIATE YOUR <span className="highlight">LEGACY</span></>}
                    subtitle="WORK WITH US"
                    description="We are looking for bold thinkers, master pixel-smiths, and architects of the impossible. Fiction is a studio where your best work isn't just encouraged—it's demanded."
                />

                <div className="jobs-grid">
                    {jobs.map((job, index) => (
                        <div key={index} className="job-card">
                            <div className="job-info">
                                <h3>{job.title}</h3>
                                <div className="job-meta">
                                    <span className="job-tag">{job.type}</span>
                                    <span className="job-tag">{job.location}</span>
                                </div>
                            </div>
                            <button className="apply-btn">
                                <span className="btn-text">Transmit Intent</span>
                            </button>
                        </div>
                    ))}
                </div>

                <SectionMarquee text="OPERATIVE BENEFITS • UPGRADE YOUR REALITY •" speed={1.5} />

                <div className="careers-benefits" style={{ marginTop: '80px' }}>
                    <h3 className="section-small-title">OPERATIVE BENEFITS</h3>
                    <div className="benefits-grid">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="benefit-card">
                                <h4>{benefit.title}</h4>
                                <p>{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <SectionMarquee text="DEPLOYMENT PROTOCOL • INITIATE SEQUENCE •" speed={2} reverse />

                <div className="careers-process" style={{ marginTop: '80px' }}>
                    <h3 className="section-small-title">THE SELECTION JOURNEY</h3>
                    <div className="process-map">
                        {process.map((item, index) => (
                            <div key={index} className="process-step">
                                <span className="step-num">{item.step}</span>
                                <div className="step-content">
                                    <h4>{item.title}</h4>
                                    <p>{item.desc}</p>
                                </div>
                                {index < process.length - 1 && <div className="step-arrow"></div>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="culture-footer">
                    <div className="culture-item">
                        <span className="culture-icon">✦</span>
                        <p>Radical Autonomy</p>
                    </div>
                    <div className="culture-item">
                        <span className="culture-icon">✦</span>
                        <p>Global Collaboration</p>
                    </div>
                    <div className="culture-item">
                        <span className="culture-icon">✦</span>
                        <p>Uncapped Innovation</p>
                    </div>
                </div>
            </div>
        </section>
    );

};

export default Careers;
