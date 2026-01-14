import JobsGrid from './components/JobsGrid';
import Benefits from './components/Benefits';
import SelectionProcess from './components/SelectionProcess';
import CultureFooter from './components/CultureFooter';
import './Careers.css';

import ScrollReveal from '../../components/ui/ScrollReveal/ScrollReveal';

const Careers = () => {
    const jobs = [
        { title: "Senior Gameplay Engineer", dept: "Engineering", loc: "Remote / Tokyo", type: "Full-time" },
        { title: "VFX Artist", dept: "Art", loc: "Tokyo", type: "Full-time" },
        { title: "Community Manager", dept: "Publishing", loc: "Remote", type: "Contract" }
    ];

    const benefits = [
        { title: "Global Freedom", desc: "Work from anywhere. We value output, not desk time." },
        { title: "Uncapped Growth", desc: "Profit sharing and equity for every full-time operative." },
        { title: "Health Protocol", desc: "Comprehensive coverage for you and your dependents." },
        { title: "Level Up", desc: "$5k annual stipend for hardware, games, and learning." }
    ];

    const process = [
        { step: "01", title: "Intel Scan", desc: "Application review" },
        { step: "02", title: "Sync", desc: "Initial culture interview" },
        { step: "03", title: "Ops Check", desc: "Technical skill assessment" },
        { step: "04", title: "Final Boss", desc: "Founders interview" }
    ];

    return (
        <div className="careers-container">
            <ScrollReveal>
                <JobsGrid jobs={jobs} />
            </ScrollReveal>

            <ScrollReveal className="section-spacer" stagger={0.1}>
                <Benefits benefits={benefits} />
            </ScrollReveal>

            <ScrollReveal className="section-spacer">
                <SelectionProcess process={process} />
            </ScrollReveal>

            <ScrollReveal className="section-spacer">
                <CultureFooter />
            </ScrollReveal>
        </div>
    );
};

export default Careers;
