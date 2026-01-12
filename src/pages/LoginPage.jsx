import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSatellite } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [credentials, setCredentials] = useState({ email: '', password: '', username: '' });
    const [isScanning, setIsScanning] = useState(false);
    const [logs, setLogs] = useState([
        { time: '08:22:15', msg: 'SYSTEM BOOT SEQUENCE INITIATED...' },
        { time: '08:22:16', msg: 'ENCRYPTED CHANNEL ESTABLISHED' },
        { time: '08:22:18', msg: 'WAITING FOR OPERATOR CREDENTIALS' }
    ]);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            const entry = {
                time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
                msg: `PING [${Math.floor(Math.random() * 999)}] - LATENCY: ${Math.floor(Math.random() * 50)}ms`
            };
            setLogs(prev => [...prev.slice(-4), entry]);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsScanning(true);
        const logEntry = { time: new Date().toLocaleTimeString('en-GB', { hour12: false }), msg: 'VERIFYING IDENTITY...' };
        setLogs(prev => [...prev.slice(-4), logEntry]);

        setTimeout(() => {
            setIsScanning(false);
            if (isLogin) {
                alert("Identity Verified. Access Granted.");
                navigate('/');
            } else {
                alert("Operative Registered. Welcome to the Network.");
                setIsLogin(true);
            }
        }, 2000);
    };

    return (
        <section className="login-v4-wrapper">
            <Link to="/" className="back-to-home">
                <FontAwesomeIcon icon={faArrowLeft} /> TERMINATION SESSION
            </Link>

            <section className="briefing-section">
                <img
                    src="/src/assets/login_briefing_bg_1768207938571.png"
                    alt="Cybernetic Control"
                    className="briefing-bg"
                />

                <div className="briefing-content">
                    <div className="sys-header">
                        <span><FontAwesomeIcon icon={faSatellite} /> SATLINK: ACTIVE</span>
                        <span>LOC: UNKNOWN_COORDS</span>
                        <span>UID: 0x8F22A1</span>
                    </div>

                    <div className="brand-logo-container">
                        <span className="brand-logo">Fiction</span>
                        <div className="brand-underline"></div>
                    </div>

                    <h1>CORE <span className="highlight">ACCESS.</span></h1>

                    <div className="mission-log">
                        {logs.map((log, idx) => (
                            <div key={idx} className="log-entry">
                                <span className="log-time">[{log.time}]</span>
                                <span className="log-message">{log.msg}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="terminal-section">
                <div className="terminal-container">
                    <div className="terminal-header">
                        <h2>{isLogin ? 'AUTH_IDENT' : 'ENLIST_OPERATIVE'}</h2>
                        <div className="status-line">
                            <div className="status-dot"></div>
                            {isLogin ? 'WAITING FOR INPUT...' : 'READY FOR REGISTRATION_'}
                        </div>
                    </div>

                    <form className="terminal-form" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="OPERATOR_NAME"
                                    required
                                    value={credentials.username}
                                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                />
                            </div>
                        )}

                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="OPERATOR_EMAIL"
                                required
                                value={credentials.email}
                                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="ACCESS_KEY"
                                required
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            />
                        </div>

                        <button type="submit" className="terminal-submit-btn" disabled={isScanning}>
                            {isScanning ? 'TRANSMITTING...' : (isLogin ? 'INITIALIZE' : 'CONFIRM')}
                        </button>
                    </form>

                    <div className="terminal-footer">
                        <span style={{ color: '#444' }}>// SELECT ACTION</span>
                        <br /><br />
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="toggle-btn"
                        >
                            {isLogin ? '> NEW OPERATIVE? ENLIST' : '> ALREADY REGISTERED? LOGIN'}
                        </button>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default LoginPage;
