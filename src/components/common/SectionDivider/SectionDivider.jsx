import React from 'react';
import './SectionDivider.css';

const SectionDivider = ({ variant = 'default' }) => {
    return (
        <hr className={`section-divider variant-${variant}`} />
    );
};

export default SectionDivider;
