import React, { useRef, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GamingNews.css';
import { newsData, gamesData } from '../../../data/gamingNewsData';
import FeaturedNews from '../../common/FeaturedNews';
import NewsItem from '../../common/NewsItem';
import GameCard from '../../common/GameCard';
import SectionHeader from '../../common/SectionHeader';



const GamingNews = () => {
    const containerRef = useRef();
    const newsGridRef = useRef();
    const liveGamesRef = useRef();
    const futureGamesRef = useRef();

    // Memoize combined games array
    const featuredGames = useMemo(() =>
        [...gamesData.mainGames, ...gamesData.midGames],
        []
    );

    useGSAP(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) return; // Skip animations if user prefers reduced motion

        // News Grid Animation
        if (newsGridRef.current) {
            const newsItems = gsap.utils.toArray('.news-grid > *');

            if (newsItems.length > 0) {
                gsap.fromTo(newsItems,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: newsGridRef.current,
                            start: "top 80%",
                            once: true,
                            toggleActions: "play none none none"
                        }
                    }
                );
            }
        }

        // Live Games Animation
        if (liveGamesRef.current) {
            const liveWrappers = liveGamesRef.current.querySelectorAll('.game-card-wrapper');

            if (liveWrappers.length > 0) {
                gsap.fromTo(liveWrappers,
                    { y: 50, autoAlpha: 0 },
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.6,
                        stagger: {
                            amount: 0.4,
                            from: "start"
                        },
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: liveGamesRef.current,
                            start: "top 90%", // Trigger slightly earlier
                            once: true
                        }
                    }
                );
            }
        }

        // Future Games Animation
        if (futureGamesRef.current) {
            const futureWrappers = futureGamesRef.current.querySelectorAll('.game-card-wrapper');

            if (futureWrappers.length > 0) {
                gsap.fromTo(futureWrappers,
                    { y: 50, autoAlpha: 0 },
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.6,
                        stagger: {
                            amount: 0.4,
                            from: "start"
                        },
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: futureGamesRef.current,
                            start: "top 90%", // Trigger slightly earlier
                            once: true
                        }
                    }
                );
            }
        }

    }, { scope: containerRef, dependencies: [] });

    const handleSeeMore = () => {
        console.log('See more clicked');
        // Add your navigation logic here
    };

    // Data validation
    if (!newsData || !gamesData) {
        return (
            <div className="gaming-news-wrapper">
                <div className="container">
                    <p style={{ color: '#fff', textAlign: 'center', padding: '4rem 0' }}>
                        Loading content...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="gaming-news-wrapper" ref={containerRef}>
            <div className="container">
                {/* News Section */}
                <section className="news-section" aria-labelledby="news-heading">
                    <SectionHeader
                        id="news-heading"
                        title="HEADLINES"
                        subtitle="LATEST UPDATES"
                        showButton={true}
                        onButtonClick={handleSeeMore}
                    />

                    <div className="news-grid" ref={newsGridRef}>
                        {newsData.featured && (
                            <FeaturedNews news={newsData.featured} />
                        )}
                        <div className="news-sidebar" role="list">
                            {newsData.sidebar?.map((news) => (
                                <NewsItem key={news.id} news={news} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Games Section */}
                <section className="games-section" aria-labelledby="games-heading">
                    <SectionHeader
                        id="games-heading"
                        title="UNIVERSE"
                        subtitle="EXPLORE OUR GAMES"
                    />

                    <div className="games-category-label" role="heading" aria-level="3">
                        LIVE & PLAYABLE
                    </div>

                    <div
                        className="all-games-grid"
                        ref={liveGamesRef}
                        role="list"
                        aria-label="Live and playable games"
                    >
                        {featuredGames.map((game) => (
                            <div key={game.id} className="game-card-wrapper">
                                <GameCard game={game} />
                            </div>
                        ))}
                    </div>

                    <div className="games-spacer" aria-hidden="true"></div>

                    <div className="games-category-label future" role="heading" aria-level="3">
                        FUTURE PROJECTS
                    </div>

                    <div
                        className="all-games-grid future-grid"
                        ref={futureGamesRef}
                        role="list"
                        aria-label="Upcoming games"
                    >
                        {gamesData.comingSoon?.map((game) => (
                            <div key={game.id} className="game-card-wrapper">
                                <GameCard game={game} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default GamingNews;