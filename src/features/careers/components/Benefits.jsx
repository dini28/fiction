const Benefits = ({ benefits }) => {
    return (
        <div className="careers-benefits" style={{ marginTop: '80px' }}>
            <h3 className="section-small-title">OPERATIVE BENEFITS</h3>
            <div className="benefits-grid">
                {benefits.map((benefit, index) => (
                    <div key={index} className="benefit-card">
                        <h4>{benefit.title}</h4>
                        <p>{benefit.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Benefits;
