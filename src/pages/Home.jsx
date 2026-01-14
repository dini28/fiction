import React from 'react';
import Hero from '../features/hero/Hero';
import NewsHomeSection from '../features/news/home/NewsHomeSection';
import TextParallax from '../features/text-parallax/TextParallax';
import CharacterShowcase from '../features/character-showcase/CharacterShowcase';
import SystemConfiguration from '../features/system-configuration/SystemConfiguration';
import EventSchedule from '../features/event-schedule/EventSchedule';
import Community from '../features/community/Community';
import Newsletter from '../features/newsletter/Newsletter';

const Home = () => {
    return (
        <main>
            <Hero />
            <NewsHomeSection />
            <TextParallax />
            <SystemConfiguration />
            <CharacterShowcase />
            <EventSchedule />
            <Community />
            <Newsletter />
        </main>
    );
};

export default Home;
