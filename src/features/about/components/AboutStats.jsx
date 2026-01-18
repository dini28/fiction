import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutStats.css';

gsap.registerPlugin(ScrollTrigger);

const StatCard = ({ stat, index }) => {
    const cardRef = useRef(null);
    const circleRef = useRef(null);
    const textRef = useRef(null);

    // Parse target value
    const targetValue = parseInt(stat.value.replace(/,/g, '').replace('+', ''));
    const isPlus = stat.value.includes('+');

    useGSAP(() => {
        const circle = circleRef.current;
        const textElement = textRef.current;
        const radius = 70;
        const circumference = 2 * Math.PI * radius;

        // Random "scramble" effect for text
        const scrambleText = () => {
            let obj = { val: 0 };
            gsap.to(obj, {
                val: targetValue,
                duration: 2,
                ease: "power2.out",
                onUpdate: () => {
                    // Show random numbers occasionally for effect
                    if (Math.random() > 0.8) {
                        textElement.innerText = Math.floor(Math.random() * targetValue).toLocaleString();
                    } else {
                        textElement.innerText = (isPlus ? '+' : '') + Math.floor(obj.val).toLocaleString();
                    }
                },
                onComplete: () => {
                    textElement.innerText = (isPlus ? '+' : '') + targetValue.toLocaleString();
                }
            });
        };


        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });

        // 1. Reveal Card
        tl.from(cardRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            delay: index * 0.1 // Stagger based on index
        });

        // 2. Animate Ring & Text
        tl.add(() => {
            // Fill ring
            gsap.to(circle, {
                strokeDashoffset: 0, // Full circle for now, or calculate based on % if needed
                duration: 1.5,
                ease: "power2.inOut"
            });
            // Start numbers
            scrambleText();
        }, "-=0.3");

    }, { scope: cardRef });

    return (
        <div className="stat-card-digital" ref={cardRef}>
            <div className="ring-container">
                <svg className="stat-ring-svg" viewBox="0 0 160 160">
                    {/* Inner rotating decorative circle */}
                    <circle cx="80" cy="80" r="50" className="ring-inner-circle" />

                    {/* Background Ring */}
                    <circle cx="80" cy="80" r="70" className="ring-bg" />

                    {/* Progress Ring */}
                    <circle
                        ref={circleRef}
                        cx="80" cy="80" r="70"
                        className="ring-progress"
                        style={{ strokeDasharray: 440, strokeDashoffset: 440 }}
                    />
                </svg>
                <div style={{ position: 'absolute' }}>
                    {/* Icon or extra deco could go here */}
                </div>
            </div>

            <div className="stat-content">
                <h3 className="stat-value-digital" ref={textRef}>0</h3>
                <span className="stat-label-digital">{stat.label}</span>
            </div>
        </div>
    );
};

const AboutStats = ({ stats = [] }) => {
    return (
        <section className="about-stats">
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <StatCard key={index} stat={stat} index={index} />
                ))}
            </div>
        </section>
    );
};

export default AboutStats;
