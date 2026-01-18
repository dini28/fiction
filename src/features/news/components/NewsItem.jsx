import Badge from '../../../components/ui/Badge';

const NewsItem = ({ news }) => {
    const { title, badge, badgeType, image, alt } = news;

    return (
        <article className="news-item" role="article">
            <div className="news-item-content">
                <h3>{title}</h3>
                <Badge text={badge} type={badgeType} />
            </div>
            <img src={image} alt={alt} loading="lazy" />
        </article>
    );
};

export default NewsItem;
