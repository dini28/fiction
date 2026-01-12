const JobsGrid = ({ jobs }) => {
    return (
        <div className="jobs-grid">
            {jobs.map((job, index) => (
                <div key={index} className="job-card">
                    <div className="job-info">
                        <h3>{job.title}</h3>
                        <div className="job-meta">
                            <span className="job-tag">{job.type}</span>
                            <span className="job-tag">{job.location}</span>
                        </div>
                    </div>
                    <button className="apply-btn">
                        <span className="btn-text">Transmit Intent</span>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default JobsGrid;
