import useKineticHover from '../../../hooks/useKineticHover';
import SectionStart from '../../../components/ui/SectionStart';

const JobCard = ({ job, onClick }) => {
    const cardRef = useKineticHover(5);

    return (
        <div
            className="job-card modern-card clickable"
            ref={cardRef}
            onClick={() => onClick(job)}
            role="button"
            tabIndex={0}
        >
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
                    View Brief
                </button>
            </div>
        </div>
    );
};

const JobsGrid = ({ jobs = [], onJobClick }) => {
    return (
        <section className="jobs-section">
            <SectionStart title="OPEN POSITIONS" subtitle="CAREERS" />
            <div className="jobs-grid">
                {jobs.map((job, index) => (
                    <JobCard key={index} job={job} onClick={onJobClick} />
                ))}
            </div>
        </section>
    );
};

export default JobsGrid;
