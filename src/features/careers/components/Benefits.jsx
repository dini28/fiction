import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useKineticHover from '../../../hooks/useKineticHover';
import SectionStart from '../../../components/ui/SectionStart';

const BenefitCard = ({ benefit }) => {
    const cardRef = useKineticHover(10);
    return (
        <div className="benefit-card modern-card" ref={cardRef}>
            <div className="card-decoration"></div>
            <div className="benefit-icon-wrapper">
                <FontAwesomeIcon icon={benefit.icon} className="benefit-icon" />
            </div>
            <h4>{benefit.title}</h4>
            <p>{benefit.desc}</p>
        </div>
    );
};

const Benefits = ({ benefits = [] }) => {
    return (
        <div className="careers-benefits" style={{ marginTop: '80px' }}>
            <SectionStart title="BENEFITS" subtitle="OPERATIVE PERKS" />
            <div className="benefits-grid">
                {benefits.map((benefit, index) => (
                    <BenefitCard key={index} benefit={benefit} />
                ))}
            </div>
        </div>
    );
};

export default Benefits;
