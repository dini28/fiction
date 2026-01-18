import React, { useEffect } from 'react';
import './NewsModal.css';

const NewsModal = ({ news, onClose }) => {

    // Close on click outside
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('news-modal-overlay')) {
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

    if (!news) return null;

    return (
        <div className={`news-modal-overlay ${news ? 'open' : ''}`} onClick={handleOverlayClick}>
            <div className="news-modal-container">
                <div className="modal-header">
                    <button className="modal-close-btn" onClick={onClose}>×</button>
                    {news.image ? (
                        <img src={news.image} alt={news.title} className="modal-hero-image" />
                    ) : (
                        <div className="modal-hero-image" style={{ background: 'linear-gradient(45deg, #111, #222)' }}></div>
                    )}
                </div>

                <div className="modal-content">
                    <div className="modal-meta">
                        <span className="modal-tag">{news.category}</span>
                        <span className="modal-date">{news.date}</span>
                    </div>

                    <h2 className="modal-title">{news.title}</h2>

                    <div className="modal-body">
                        {news.content ? (
                            <p>{news.content}</p>
                        ) : (
                            <p>{news.description}</p>
                        )}
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="share-btn">SHARE INTEL</button>
                </div>
            </div>
        </div>
    );
};

export default NewsModal;
