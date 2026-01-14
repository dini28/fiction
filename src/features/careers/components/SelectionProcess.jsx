import SectionStart from '../../../components/ui/SectionStart';

const SelectionProcess = ({ process = [] }) => {
    return (
        <div className="careers-process" style={{ marginTop: '80px' }}>
            <SectionStart title="PROCESS" subtitle="SELECTION JOURNEY" />
            <div className="process-map">
                {process.map((item, index) => (
                    <div key={index} className="process-step">
                        <span className="step-num">{item.step}</span>
                        <div className="step-content">
                            <h4>{item.title}</h4>
                            <p>{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectionProcess;
