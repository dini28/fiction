const FeaturedNews = ({ news }) => {
    const { image, title, subtitle } = news;

    return (
        <article className="featured-news" role="article" aria-label="Featured news">
            <img src={image} alt={title} loading="lazy" />
            <div className="featured-content">
                <h2>
                    {title}
                    <br />
                    {subtitle}
                </h2>
            </div>
        </article>
    );
};

export default FeaturedNews;
