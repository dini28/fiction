import React, { useEffect } from 'react';
import './CareerModal.css';

const CareerModal = ({ job, onClose }) => {

    // Close on click outside
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('career-modal-overlay')) {
            onClose();
        }
    };

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!job) return null;

    return (
        <div className={`career-modal-overlay ${job ? 'open' : ''}`} onClick={handleOverlayClick}>
            <div className="career-modal-container">
                <button className="close-btn" onClick={onClose}>×</button>

                <div className="career-modal-header">
                    <div className="career-job-dept">{job.dept} // {job.type}</div>
                    <h2 className="career-job-title">{job.title}</h2>
                    <div className="career-meta-row">
                        <span>LOCATION: {job.loc}</span>
                        {job.status && <span>STATUS: {job.status}</span>}
                    </div>
                </div>

                <div className="career-modal-content">
                    <div className="career-section">
                        <h3>MISSION BRIEF</h3>
                        <p>{job.description}</p>
                    </div>

                    <div className="career-section">
                        <h3>OPERATIONAL REQUIREMENTS</h3>
                        <ul>
                            {job.requirements?.map((req, index) => (
                                <li key={index}>{req}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="career-section">
                        <h3>OBJECTIVES & RESPONSIBILITIES</h3>
                        <ul>
                            {job.responsibilities?.map((resp, index) => (
                                <li key={index}>{resp}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="career-modal-footer">
                    <button className="apply-action-btn">INITIATE APPLICATION</button>
                </div>
            </div>
        </div>
    );
};

export default CareerModal;
