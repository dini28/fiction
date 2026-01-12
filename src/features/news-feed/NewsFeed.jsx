import React from 'react';
import PageHero from '../../components/ui/PageHero/PageHero';
import NewsMasonry from './components/NewsMasonry';
import newsHeroBg from '../../assets/images/news-hero.png';
import './NewsFeed.css';

const NewsFeed = () => {
    const newsItems = [
        { id: 1, category: "ESPORTS", date: "JAN 12, 2026", title: "TOKYO FINALS: TEAM ECHO TAKES THE CROWN", description: "In a stunning upset, the underdogs from Sector 7 defeated the reigning champions. Full match analysis enclosed.", type: "featured" },
        { id: 2, category: "UPDATE", date: "JAN 10, 2026", title: "PATCH 4.2: NEON HORIZON", description: "New map 'Cyber-Slums' added. Weapon balance adjustments. Netcode optimizations.", type: "standard" },
        { id: 3, category: "COMMUNITY", date: "JAN 08, 2026", title: "FAN ART SPOTLIGHT: VOL. 24", description: "Showcasing the incredible creativity of our operatives. This week: 3D character renders.", type: "standard" },
        { id: 4, category: "DEV", date: "JAN 05, 2026", title: "BEHIND THE SCENES: AUDIO DESIGN", description: "Audio Director Sarah Lin discusses the process of creating the soundscape for the new agent.", type: "standard" },
        { id: 5, category: "ESPORTS", date: "JAN 02, 2026", title: "ROSTER SHUFFLE: OFF-SEASON TRACKER", description: "Keeping tabs on all the player movements ahead of the Spring Split.", type: "standard" },
        { id: 6, category: "LORE", date: "DEC 28, 2025", title: "THE ARCHIVES: PROJECT GENESIS", description: "Uncover the origins of the Fiction Protocol in this deep dive into the lore.", type: "standard" }
    ];

    return (
        <div className="news-feed-container">
            <PageHero
                title="TRANSMISSIONS"
                subtitle="NEWS & UPDATES"
                description="Stay connected to the pulse of the network. Operational updates, esports intel, and developer logs."
                backgroundImage={newsHeroBg}
                alignment="center"
            />
            <NewsMasonry items={newsItems} />
            <div className="feed-pagination">
                <button className="load-more-btn">DECRYPT OLDER LOGS</button>
            </div>
        </div>
    );
};

export default NewsFeed;
