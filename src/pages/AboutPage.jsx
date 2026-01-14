import About from '../features/about/About';
import PageHero from '../components/ui/PageHero/PageHero';
import aboutHeroBg from '../assets/images/about-hero.jpg';

const AboutPage = () => {
    return (
        <div className="page-wrapper about-page">
            <PageHero
                title="WHO WE ARE"
                subtitle="FICTION STUDIOS"
                description="We exist to push the boundaries of the medium. In an industry often paralyzed by caution, we choose volatility."
                backgroundImage={aboutHeroBg}
                alignment="center"
            />
            <About />
        </div>
    );
};

export default AboutPage;
