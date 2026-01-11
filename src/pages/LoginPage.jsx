import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faFingerprint, faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [credentials, setCredentials] = useState({ email: '', password: '', username: '' });
    const [isScanning, setIsScanning] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsScanning(true);
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
        <section className="login-page-wrapper">
            <Link to="/" className="back-to-home">
                <FontAwesomeIcon icon={faArrowLeft} /> BACK TO HOME
            </Link>

            <section className="content-section">
                <img
                    src="/src/assets/login_left_visual_1768155907468.png"
                    alt="Cybernetic Visual"
                    className="visual-background"
                />
                <div className="content-overlay">
                    <div className="brand-tag">
                        <span className="company-name">FICTION </span>
                        NETWORK
                    </div>
                    <h1>EVOLVE YOUR <span className="highlight">IDENTITY.</span></h1>
                    <p>
                        Access the most advanced narrative engine in the galaxy.
                        Join thousands of operatives shaping the future of digital fiction.
                    </p>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <h3>50K+</h3>
                            <p>ACTIVE OPERATIVES</p>
                        </div>
                        <div className="stat-item">
                            <h3>12M+</h3>
                            <p>STORIES GENERATED</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="auth-section">
                <div className="auth-container">
                    <div className="auth-header">
                        <h2>{isLogin ? 'WELCOME BACK' : 'JOIN THE NETWORK'}</h2>
                        <p>{isLogin ? 'Please enter your credentials to proceed' : 'Create your operative profile to begin'}</p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="input-group">
                                <FontAwesomeIcon icon={faUser} className="input-icon" />
                                <input
                                    type="text"
                                    placeholder="OPERATOR NAME"
                                    required
                                    value={credentials.username}
                                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                />
                            </div>
                        )}

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

                        <button type="submit" className="auth-submit-btn" disabled={isScanning}>
                            <span className="btn-text">
                                {isScanning ? 'VERIFYING...' : (isLogin ? 'LOGIN' : 'REGISTER')}
                            </span>
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            {isLogin ? "Don't have an account?" : "Already an operative?"}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="toggle-link"
                            >
                                {isLogin ? 'Enlist Now' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default LoginPage;
