import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SectionStart from '../../../components/ui/SectionStart';

const SelectionProcess = ({ process = [] }) => {
    return (
        <div className="careers-process" style={{ marginTop: '80px' }}>
            <SectionStart title="PROCESS" subtitle="SELECTION JOURNEY" />
            <div className="process-map modern-process">
                {process.map((item, index) => (
                    <div key={index} className="process-step">
                        <div className="step-badge">
                            <span className="step-num">{item.step}</span>
                        </div>
                        <div className="step-icon-container">
                            <FontAwesomeIcon icon={item.icon} className="step-icon" />
                        </div>
                        <div className="step-content">
                            <h4>{item.title}</h4>
                            <p>{item.desc}</p>
                        </div>
                        {index < process.length - 1 && <div className="step-connector"></div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectionProcess;
