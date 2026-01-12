const NewsHero = ({ featured }) => {
    if (!featured) return null;
    return (
        <div className="feed-hero">
            <div className="hero-badge">BREAKING NEWS</div>
            <div className="hero-content">
                <img src={featured.image} alt={featured.title} className="hero-img" />
                <div className="hero-text-overlay">
                    <span className="hero-tag">{featured.category}</span>
                    <h2>{featured.title}</h2>
                    <p>{featured.description}</p>
                    <button className="read-more-btn">
                        <span className="btn-text">DECRYPT ARTICLE</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsHero;
