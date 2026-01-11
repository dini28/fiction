import Hero from "../features/hero/Hero"
import TextParallax from "../features/text-parallax/TextParallax"
import CharacterShowcase from "../features/character-showcase/CharacterShowcase"
import Community from "../features/community/Community"
import Newsletter from "../features/newsletter/Newsletter"
import SectionMarquee from "../components/ui/SectionMarquee/SectionMarquee";
import HeroNews from "../features/HeroNews/HeroNews"

const Home = () => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <Hero />
            <SectionMarquee text={`WELCOME TO THE FUTURE • EST ${currentYear} •`} speed={1.5} />
            <TextParallax />
            <HeroNews />
            <CharacterShowcase />
            <SectionMarquee text="UNLEASH YOUR POWER • DOMINATE THE ARENA •" speed={2.5} />
            <SectionMarquee text="JOIN THE FICTION • PLAY FOR FREE •" />
            <Community />
            <Newsletter />
        </>
    );
};

export default Home;
