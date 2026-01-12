const AboutMission = ({ textRef }) => {
    return (
        <div className="about-main">
            <p className="about-mission" ref={textRef}>
                <span className="accent-text">MISSION LOG 2026:</span> We exist to push the boundaries of the medium.
                In an industry often paralyzed by caution, we choose volatility. We build for the players who
                crave complexity, speed, and soul. Our studio is a decentralized network of veterans
                and prodigies, united by a single code: <span className="white-text">Make it unforgettable.</span>
            </p>

            <div className="about-values">
                <div className="value-card">
                    <h3>Innovation</h3>
                    <p>Breaking technical boundaries to deliver the impossible.</p>
                </div>
                <div className="value-card">
                    <h3>Narrative</h3>
                    <p>Story-first development in everything we create.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutMission;
