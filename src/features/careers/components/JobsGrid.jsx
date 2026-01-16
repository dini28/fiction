import useKineticHover from '../../../hooks/useKineticHover';
import SectionStart from '../../../components/ui/SectionStart';

const JobCard = ({ job }) => {
    const cardRef = useKineticHover(5);

    return (
        <div className="job-card modern-card" ref={cardRef}>
            <div className="card-accent-line"></div>
            <div className="job-header">
                <div className="job-info">
                    <h3>{job.title}</h3>
                    {job.status && <span className={`job-status ${job.status.toLowerCase()}`}>{job.status}</span>}
                </div>
            </div>
            <div className="job-meta">
                <span className="meta-bracket">//</span> {job.dept}
            </div>
            <div className="job-meta">{job.loc}</div>
            <div className="job-meta">{job.type}</div>
            <div className="job-action">
                <button className="apply-btn">
                    Apply Now
                </button>
            </div>
        </div>
    );
};

const JobsGrid = ({ jobs = [] }) => {
    return (
        <section className="jobs-section">
            <SectionStart title="OPEN POSITIONS" subtitle="CAREERS" />
            <div className="jobs-grid">
                {jobs.map((job, index) => (
                    <JobCard key={index} job={job} />
                ))}
            </div>
        </section>
    );
};

export default JobsGrid;
