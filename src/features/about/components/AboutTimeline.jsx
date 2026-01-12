const AboutTimeline = ({ timeline }) => {
    return (
        <div className="about-origins">
            <h3 className="section-small-title">OUR ORIGINS / SYSTEM LOGS</h3>
            <div className="timeline-container">
                {timeline.map((item, index) => (
                    <div key={index} className="timeline-item">
                        <span className="timeline-year">{item.year}</span>
                        <div className="timeline-line"></div>
                        <p className="timeline-event">{item.event}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutTimeline;
