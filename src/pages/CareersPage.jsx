import { Suspense, lazy } from 'react';
import Careers from '../features/careers/Careers';
import PageHero from '../components/ui/PageHero/PageHero';
import careerHero from '../assets/images/careerHero.jpg';

const TextScrollSection = lazy(() => import('../features/animation-showcase/TextScrollSection'));

const CareersPage = () => {
    return (
        <div className="page-wrapper careers-page">
            <PageHero
                title="JOIN THE RANKS"
                subtitle="CAREERS AT FICTION"
                description="We are building the next generation of digital experiences. If you have the skill and the will, report for duty."
                backgroundImage={careerHero}
                alignment="center"
            />
            <Suspense fallback={<div style={{ height: '50vh', background: '#0b0b0b' }} />}>
                <TextScrollSection />
            </Suspense>
            <Careers />
        </div>
    );
};

export default CareersPage;
