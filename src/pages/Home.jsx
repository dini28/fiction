import React from 'react';
import Hero from '../features/hero/Hero';
import HeroNews from '../features/HeroNews/HeroNews';
import TextParallax from '../features/text-parallax/TextParallax';
import CharacterShowcase from '../features/character-showcase/CharacterShowcase';
import Community from '../features/community/Community';
import Newsletter from '../features/newsletter/Newsletter';

const Home = () => {
    return (
        <main>
            <Hero />
            <HeroNews />
            <TextParallax />
            <CharacterShowcase />
            <Community />
            <Newsletter />
        </main>
    );
};

export default Home;
