import aboutUs from '../../../assets/images/aboutUs.png';
import { useGSAP } from '@gsap/react';
import SectionStart from '../../../components/ui/SectionStart';
import gsap from 'gsap';
import { useRef } from 'react';

const AboutMission = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(".mission-visual", {
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
            .from(".mission-content > *", {
                x: -30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.5");

    }, { scope: containerRef });

    return (
        <section className="about-mission" ref={containerRef}>
            <div className="mission-grid">
                <div className="mission-content">
                    <SectionStart title="FORGING THE IMPOSSIBLE" subtitle="CORE DIRECTIVE" />
                    <p className="mission-lead">
                        We don't just build games; we engineer digital singularities. Our studio is a convergence point for art, technology, and storytelling.
                    </p>

                    <div className="values-stack">
                        <div className="value-item">
                            <span className="value-number">01</span>
                            <div className="value-info">
                                <h3>Technical Dominance</h3>
                                <p>Pushing engine capabilities beyond specifications. We optimize for the bleeding edge.</p>
                            </div>
                        </div>
                        <div className="value-item">
                            <span className="value-number">02</span>
                            <div className="value-info">
                                <h3>Narrative Depth</h3>
                                <p>stories that resonate on a sub-atomic level. Characters that bleed, worlds that breathe.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mission-visual">
                    <div className="visual-frame">
                        <img src={aboutUs} alt="Fiction Studios HQ" className="office-image" />
                        <div className="frame-corner top-left"></div>
                        <div className="frame-corner bottom-right"></div>
                        <div className="scan-line"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMission;
