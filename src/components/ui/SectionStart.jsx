import MagneticButton from './MagneticButton/MagneticButton';
import Icon from './Icon';
import './SectionStart.css';

const SectionStart = ({ title, subtitle, description, withButton = false, buttonLabel = "See More", onClick }) => {
    return (
        <div className="section-start">
            <div className="start-row">
                <div className="start-content">
                    {subtitle && <p className="start-subtitle">{subtitle}</p>}
                    <h2 className="start-title">{title}</h2>
                    {description && <p className="section-description">{description}</p>}
                </div>

                {withButton && (
                    <MagneticButton
                        className="start-btn"
                        onClick={onClick}
                        aria-label={buttonLabel}
                    >
                        <span className="btn-text">{buttonLabel}</span>
                        <Icon type="chevron-right" />
                    </MagneticButton>
                )}
            </div>
        </div>
    );
};

export default SectionStart;
