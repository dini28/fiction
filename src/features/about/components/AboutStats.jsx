import { useRef, useMemo } from 'react';
import useCountUp from '../../../hooks/useCountUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const StatItem = ({ stat }) => {
    // Determine target value for count up
    const targetValue = parseInt(stat.value.replace(/,/g, '').replace('+', ''));
    const { count, elementRef } = useCountUp(targetValue, 2);
    
    // Generate a random width once
    const randomWidth = useMemo(() => Math.floor(Math.random() * 40) + 60, []);

    return (
        <div className="stat-card" ref={elementRef}>
             <h3 className="stat-value">
                {stat.value.includes('+') ? '+' : ''}{count.toLocaleString()}
            </h3>
            <span className="stat-label-small">{stat.label}</span>
            <div className="stat-bar">
                <div className="stat-bar-fill" style={{ width: `${randomWidth}%` }}></div>
            </div>
        </div>
    );
};

const AboutStats = ({ stats = [] }) => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(".stats-grid", {
            scaleX: 0,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        })
        .from(".stat-card", {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1
        }, "-=0.4")
        .from(".stat-bar-fill", {
            width: "0%",
            duration: 1.5,
            ease: "power2.out",
            stagger: 0.1
        }, "-=0.2");

    }, { scope: containerRef });

    return (
        <section className="about-stats" ref={containerRef}>
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <StatItem key={index} stat={stat} />
                ))}
            </div>
        </section>
    );
};

export default AboutStats;
