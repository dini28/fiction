import useKineticHover from '../../../hooks/useKineticHover';
import SectionStart from '../../../components/ui/SectionStart';

const JobCard = ({ job }) => {
    const cardRef = useKineticHover(5);

    return (
        <div className="job-card" ref={cardRef}>
             <div className="card-accent-line"></div>
            <div className="job-info">
                <h3>{job.title}</h3>
            </div>
            <div className="job-meta">
                <span style={{color: 'var(--color-primary)'}}>//</span> {job.dept}
            </div>
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
