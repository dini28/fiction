import React, { useState } from 'react';
import PageHero from '../../../components/ui/PageHero/PageHero';
import SectionStart from '../../../components/ui/SectionStart';
import NewsMasonry from './components/NewsMasonry';
import NewsModal from './components/NewsModal';
import NewsHero from '../../../assets/images/backgrounds/NewsHero.jpg';
import { newsItems } from '../../../data/newsData';
import './NewsFeed.css';

const NewsFeed = () => {
    // State to track which news item is selected for the modal
    const [selectedNews, setSelectedNews] = useState(null);

    // Handler to open modal
    const handleNewsClick = (newsItem) => {
        setSelectedNews(newsItem);
    };

    // Handler to close modal
    const handleCloseModal = () => {
        setSelectedNews(null);
    };

    return (
        <div className="news-feed-container">
            <PageHero
                title="TRANSMISSIONS"
                subtitle="NEWS & UPDATES"
                description="Stay connected to the pulse of the network. Operational updates, esports intel, and developer logs."
                backgroundImage={NewsHero}
                alignment="center"
            />
            <div className="news-feed-content">
                <SectionStart title="LATEST LOGS" subtitle="ARCHIVES" />
                <NewsMasonry items={newsItems} onNewsClick={handleNewsClick} />
            </div>
            {/* Modal Popup */}
            <NewsModal news={selectedNews} onClose={handleCloseModal} />

            <div className="feed-pagination">
                <button className="load-more-btn">DECRYPT OLDER LOGS</button>
            </div>
        </div>
    );
};

export default NewsFeed;
