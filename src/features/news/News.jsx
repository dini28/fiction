import NewsFeed from './feed/NewsFeed';
import './News.css'; // Assuming we might move CSS here or create one

const News = () => {
    return (
        <div className="page-wrapper news-page">
            <NewsFeed />
        </div>
    );
};

export default News;
