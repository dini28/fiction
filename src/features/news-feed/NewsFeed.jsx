import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionMarquee from '../../components/ui/SectionMarquee/SectionMarquee';
import './NewsFeed.css';
import { newsData } from '../../data/gamingNewsData';

const NewsFeed = () => {
    const containerRef = useRef();

    useGSAP(() => {
        // Hero entry
        gsap.from(".feed-hero", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        });

        // Masonry cards entry
        gsap.from(".news-card", {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".news-masonry",
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });

        // Refresh triggers on load
        ScrollTrigger.refresh();
    }, { scope: containerRef });

    const featured = newsData.featured;
    const items = newsData.sidebar;

    return (
        <div className="news-feed-container" ref={containerRef}>
            <header className="feed-header">
                <p className="feed-subtitle">FREQUENCY: HIGH</p>
                <h1 className="feed-title">THE FICTION <span className="highlight">FEED</span></h1>
            </header>

            <NewsHero featured={featured} />

            <div className="feed-divider">
                <SectionMarquee text="INCOMING TRANSMISSIONS • GLOBAL FEED •" speed={1} />
            </div>

            <NewsMasonry items={items} />

            <div className="feed-pagination">
                <button className="load-more-btn">
                    <span className="btn-text">LOAD MORE FREQUENCIES</span>
                </button>
            </div>
        </div>
    );
};

export default NewsFeed;
