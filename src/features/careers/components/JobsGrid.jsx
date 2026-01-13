import React from 'react';
import useKineticHover from '../../../hooks/useKineticHover';

const JobCard = ({ job }) => {
    const cardRef = useKineticHover(5); // Subtle effect for list items

    return (
        <div className="job-card" ref={cardRef}>
            <div className="job-info">
                <h3>{job.title}</h3>
            </div>
            <div className="job-meta">{job.dept}</div>
            <div className="job-meta">{job.loc}</div>
            <div className="job-meta">{job.type}</div>
            <button className="apply-btn">
                Apply
            </button>
        </div>
    );
};

const JobsGrid = ({ jobs = [] }) => {
    return (
        <div className="jobs-grid">
            {jobs.map((job, index) => (
                <JobCard key={index} job={job} />
            ))}
        </div>
    );
};

export default JobsGrid;
