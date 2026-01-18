import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import SectionStart from '../../../components/ui/SectionStart';
import gsap from 'gsap';

const AboutTimeline = ({ timeline = [] }) => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const items = gsap.utils.toArray('.timeline-item');

        items.forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                x: -50,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power3.out"
            });
        });

    }, { scope: containerRef, dependencies: [timeline] });

    return (
        <section className="about-origins" ref={containerRef}>
            <SectionStart title="ORIGINS" subtitle="SYSTEM LOGS" />
            <div className="timeline-container">
                {timeline.map((item, index) => (
                    <div key={index} className="timeline-item">
                        <div className="timeline-year">{item.year}</div>
                        <div className="timeline-track">
                            <div className="timeline-node"></div>
                            <div className="timeline-line"></div>
                        </div>
                        <div className="timeline-content">
                            <div className="content-header">
                                <span className="system-tag">SYS.LOG.0{index + 1}</span>
                                <span className="status-tag">:: ARCHIVED</span>
                            </div>
                            <p className="timeline-event">{item.event}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AboutTimeline;
