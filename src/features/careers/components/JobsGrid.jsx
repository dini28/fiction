const JobsGrid = ({ jobs = [] }) => {
    return (
        <div className="jobs-grid">
            {jobs.map((job, index) => (
                <div key={index} className="job-card">
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
            ))}
        </div>
    );
};

export default JobsGrid;
