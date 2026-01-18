import Hero from './hero/Hero';
import NewsHomeSection from '../news/home/NewsHomeSection';
import TextParallax from './text-parallax/TextParallax';
import CharacterShowcase from './character-showcase/CharacterShowcase';
import SystemConfiguration from './system-configuration/SystemConfiguration';
import EventSchedule from './event-schedule/EventSchedule';
import Community from './community/Community';
import Newsletter from './newsletter/Newsletter';

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
