import { Suspense, lazy } from 'react';
import About from '../features/about/About';
import PageHero from '../components/ui/PageHero/PageHero';
import aboutHeroBg from '../assets/images/about-hero.jpg';

const DrawSVGSection = lazy(() => import('../features/animation-showcase/DrawSVGSection'));

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
            <Suspense fallback={<div style={{ height: '80vh', background: '#050505' }} />}>
                <DrawSVGSection />
            </Suspense>
            <About />
        </div>
    );
};

export default AboutPage;
