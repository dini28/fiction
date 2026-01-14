import Careers from '../features/careers/Careers';
import PageHero from '../components/ui/PageHero/PageHero';
import careerHero from '../assets/images/careerHero.jpg';

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
            <Careers />
        </div>
    );
};

export default CareersPage;
