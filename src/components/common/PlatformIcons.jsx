import React from 'react';
import Icon from './Icon';

const PlatformIcons = ({ platforms }) => {
    if (!platforms || platforms.length === 0) return null;

    return (
        <div className="platforms">
            {platforms.map((platform, index) => (
                <div
                    key={`${typeof platform === 'string' ? platform : platform.iconName}-${index}`}
                    className="platform-icon"
                    title={typeof platform === 'string' ? platform.replace('-', ' ') : ''}
                >
                    <Icon type={platform} />
                </div>
            ))}
        </div>
    );
};

export default PlatformIcons;
