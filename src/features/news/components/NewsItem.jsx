const NewsItem = ({ news }) => {
    const { title, image, alt } = news;

    return (
        <article className="news-item" role="article">
            <div className="news-item-content">
                <h3>{title}</h3>
            </div>
            <img src={image} alt={alt} loading="lazy" />
        </article>
    );
};

export default NewsItem;
