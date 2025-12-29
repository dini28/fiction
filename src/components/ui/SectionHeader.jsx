import Icon from './Icon';
import './SectionHeader.css';

const SectionHeader = ({ title, subtitle, showButton = false, onButtonClick }) => {
    return (
        <div className="section-header">
            <div className="header-content">
                {subtitle && <p className="section-subtitle">{subtitle}</p>}
                <h1 className="section-title">{title}</h1>
            </div>

            {showButton && (
                <button
                    className="see-more-btn"
                    onClick={onButtonClick}
                    aria-label={`See more ${title.toLowerCase()}`}
                >
                    <span className="btn-text">See More</span>
                    <Icon type="chevron-right" />
                </button>
            )}
        </div>
    );
};

export default SectionHeader;
