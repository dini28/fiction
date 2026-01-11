const Badge = ({ text, type = 'default' }) => {
    const badgeClass = type === 'lol' ? 'badge lol' : 'badge';
    return <div className={badgeClass}>{text}</div>;
};

export default Badge;
