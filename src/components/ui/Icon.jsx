import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faMobileAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faApple, faPlaystation, faXbox } from '@fortawesome/free-brands-svg-icons';

const Icon = ({ type }) => {
    const iconMap = {
        'desktop': faDesktop,
        'apple': faApple,
        'mobile-alt': faMobileAlt,
        'playstation': faPlaystation,
        'xbox': faXbox,
        'chevron-right': faChevronRight
    };

    // If type is a string key in our map
    if (typeof type === 'string' && iconMap[type]) {
        return <FontAwesomeIcon icon={iconMap[type]} />;
    }

    // If type is an icon object (from imports)
    if (typeof type === 'object' && type.iconName) {
        return <FontAwesomeIcon icon={type} />;
    }

    // Fallback for custom classes
    return <i className={type} aria-hidden="true" />;
};

export default Icon;
