import { useState } from 'react';
import JobsGrid from './components/JobsGrid';
import Benefits from './components/Benefits';
import SelectionProcess from './components/SelectionProcess';
import CultureFooter from './components/CultureFooter';
import CareerModal from './components/CareerModal';
import './Careers.css';

import ScrollReveal from '../../components/ui/ScrollReveal/ScrollReveal';
import CareersData from './data/CareersData';

const Careers = () => {
    const [selectedJob, setSelectedJob] = useState(null);

    const handleJobClick = (job) => {
        setSelectedJob(job);
    };

    const handleCloseModal = () => {
        setSelectedJob(null);
    };

    return (
        <div className="careers-container">
            <ScrollReveal>
                <JobsGrid jobs={CareersData.careerOpportunities} onJobClick={handleJobClick} />
            </ScrollReveal>

            <CareerModal job={selectedJob} onClose={handleCloseModal} />

            <ScrollReveal className="section-spacer" stagger={0.1}>
                <Benefits benefits={CareersData.benefits} />
            </ScrollReveal>

            <ScrollReveal className="section-spacer">
                <SelectionProcess process={CareersData.process} />
            </ScrollReveal>

            <ScrollReveal className="section-spacer">
                <CultureFooter />
            </ScrollReveal>
        </div>
    );
};

export default Careers;
