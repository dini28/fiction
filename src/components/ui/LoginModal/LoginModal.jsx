import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faEnvelope, faLock, faFingerprint } from '@fortawesome/free-solid-svg-icons';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            alert("Identity Verified. Access Granted.");
            onClose();
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="login-overlay">
            <div className="login-modal" onClick={(e) => e.stopPropagation()}>
                <button className="login-close" onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <div className="login-header">
                    <div className="login-icon-box">
                        <FontAwesomeIcon icon={faFingerprint} className={isScanning ? 'scanning' : ''} />
                    </div>
                    <h2>SYSTEM <span className="highlight">ACCESS</span></h2>
                    <p>Transmit credentials for identity verification</p>
                </div>

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                        <input
                            type="email"
                            placeholder="OPERATOR EMAIL"
                            required
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        />
                    </div>

                    <div className="input-group">
                        <FontAwesomeIcon icon={faLock} className="input-icon" />
                        <input
                            type="password"
                            placeholder="ACCESS KEY"
                            required
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        />
                    </div>

                    <div className="login-options">
                        <label className="checkbox-container">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                            REMEMBER IDENTITY
                        </label>
                        <a href="#reset" className="forgot-link">LEAKED KEY?</a>
                    </div>

                    <button type="submit" className="login-submit-btn" disabled={isScanning}>
                        <div className="scan-line"></div>
                        <span className="btn-text">{isScanning ? 'VERIFYING...' : 'INITIALIZE LOGIN'}</span>
                    </button>
                </form>

                <div className="social-login">
                    <p>EXTERNAL FEDERATION</p>
                    <div className="social-btns">
                        <button className="social-btn google">G</button>
                        <button className="social-btn discord">D</button>
                    </div>
                </div>

                <div className="login-footer">
                    <p>New operative? <a href="#enlist" className="enlist-link">Enlist Here</a></p>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
