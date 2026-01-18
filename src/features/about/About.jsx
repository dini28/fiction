import AboutMission from './components/AboutMission';
import AboutTimeline from './components/AboutTimeline';
import AboutCollective from './components/AboutCollective';
import FictionProtocol from './components/FictionProtocol';
import './About.css';
import ScrollReveal from '../../components/ui/ScrollReveal/ScrollReveal';
import AboutData from './data/AboutData';

const About = () => {
    return (
        <div className="about-container">
            <ScrollReveal className="section-spacer">
                <AboutMission />
            </ScrollReveal>

            <ScrollReveal className="section-spacer">
                <AboutTimeline timeline={AboutData.timelineData} />
            </ScrollReveal>

            <ScrollReveal className="section-spacer">
                <AboutCollective team={AboutData.teamData} />
            </ScrollReveal>

            <ScrollReveal className="section-spacer">
                <FictionProtocol />
            </ScrollReveal>
        </div>
    );
};

export default About;
