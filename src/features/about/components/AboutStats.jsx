import React, { useRef } from 'react';
import useCountUp from '../../../hooks/useCountUp';

const StatItem = ({ stat }) => {
    const { count, elementRef } = useCountUp(parseInt(stat.value.replace(/,/g, '')), 1.5);

    return (
        <div className="stat-card" ref={elementRef}>
            <h3 className="stat-value">
                {stat.value.includes('+') ? '+' : ''}{count.toLocaleString()}
                <span className="stat-label-small">{stat.label}</span>
            </h3>
        </div>
    );
};

const AboutStats = ({ stats = [] }) => {
    return (
        <div className="about-stats">
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <StatItem key={index} stat={stat} />
                ))}
            </div>
        </div>
    );
};

export default AboutStats;
