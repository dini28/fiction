import React from 'react';
import useKineticHover from '../../../hooks/useKineticHover';

const BenefitCard = ({ benefit }) => {
    const cardRef = useKineticHover(10);
    return (
        <div className="benefit-card" ref={cardRef}>
            <h4>{benefit.title}</h4>
            <p>{benefit.desc}</p>
        </div>
    );
};

const Benefits = ({ benefits = [] }) => {
    return (
        <div className="careers-benefits" style={{ marginTop: '80px' }}>
            <h3 className="section-small-title">OPERATIVE BENEFITS</h3>
            <div className="benefits-grid">
                {benefits.map((benefit, index) => (
                    <BenefitCard key={index} benefit={benefit} />
                ))}
            </div>
        </div>
    );
};

export default Benefits;
