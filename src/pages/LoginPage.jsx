import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faArrowLeft, 
    faVolumeHigh, 
    faVolumeXmark, 
    faSatelliteDish,
    faCheck
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import briefingBg from '../assets/login_briefing_bg_1768207938571.png';
import './LoginPage.css';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [credentials, setCredentials] = useState({ email: '', password: '', username: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [audioEnabled, setAudioEnabled] = useState(false);
    
    // Telemetry logs for briefing (left panel)
    const [logs, setLogs] = useState([
        { time: '08:22:15', msg: 'SYSTEM BOOT SEQUENCE INITIATED...' },
        { time: '08:22:16', msg: 'ENCRYPTED CHANNEL ESTABLISHED' },
        { time: '08:22:18', msg: 'WAITING FOR OPERATOR CREDENTIALS' },
        { time: '08:22:19', msg: 'FICTION PROTOCOL ACTIVATED' }
    ]);
    
    // Transmitting logs (for HUD scanning overlay)
    const [hudLogs, setHudLogs] = useState([]);
    const [successState, setSuccessState] = useState(false);
    const [successCountdown, setSuccessCountdown] = useState(3);
    
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const cardRef = useRef(null);
    const audioCtxRef = useRef(null);
    const timersRef = useRef([]);

    useEffect(() => () => {
        timersRef.current.forEach(clearTimeout);
        audioCtxRef.current?.close();
    }, []);

    // Browsers cap the number of live AudioContexts, so one is shared for every effect
    const getAudioContext = () => {
        if (!audioCtxRef.current) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) return null;
            audioCtxRef.current = new AudioContextClass();
        }
        if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
        return audioCtxRef.current;
    };

    // Dynamic Sound Effects Synthesizer using Web Audio API
    const playAudioEffect = (type) => {
        if (!audioEnabled) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            
            if (type === 'click') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1200, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
                
                gain.gain.setValueAtTime(0.04, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
                
                osc.start();
                osc.stop(ctx.currentTime + 0.08);
            } else if (type === 'hover') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1600, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.04);
                
                gain.gain.setValueAtTime(0.015, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
                
                osc.start();
                osc.stop(ctx.currentTime + 0.04);
            } else if (type === 'keypress') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(600, ctx.currentTime);
                
                gain.gain.setValueAtTime(0.01, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
                
                osc.start();
                osc.stop(ctx.currentTime + 0.02);
            } else if (type === 'granted') {
                // Major arpeggio roll
                const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
                notes.forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
                    
                    gain.gain.setValueAtTime(0.0, ctx.currentTime);
                    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + idx * 0.08 + 0.02);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);
                    
                    osc.start(ctx.currentTime + idx * 0.08);
                    osc.stop(ctx.currentTime + idx * 0.08 + 0.4);
                });
            } else if (type === 'denied') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(130, ctx.currentTime);
                
                gain.gain.setValueAtTime(0.08, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.25);
                
                osc.start();
                osc.stop(ctx.currentTime + 0.25);
            }
        } catch (e) {
            console.warn("Audio Context failed to initialize: ", e);
        }
    };

    // HTML5 Canvas Cyber Background Simulation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        let animationId;
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;
        
        // Mouse Coordinates tracking
        let mouse = { x: null, y: null };
        
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        
        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        
        // Coordinate points setup
        const density = Math.min(90, Math.floor((width * height) / 14000));
        const nodes = [];
        
        for (let i = 0; i < density; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                radius: Math.random() * 1.5 + 1
            });
        }
        
        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };
        
        window.addEventListener('resize', handleResize);
        
        const render = () => {
            ctx.clearRect(0, 0, width, height);
            
            // Draw node coordinates
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;
                
                // Bounce inside bounds
                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;
                
                // Repel away from mouse gently
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - node.x;
                    const dy = mouse.y - node.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        const force = (120 - dist) / 120;
                        node.x -= dx * force * 0.035;
                        node.y -= dy * force * 0.035;
                    }
                }
                
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 243, 255, 0.22)';
                ctx.fill();
            });
            
            // Connect coordinates with lines
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        
                        const alpha = (1 - dist / 110) * 0.09;
                        ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
                        ctx.lineWidth = 0.55;
                        ctx.stroke();
                    }
                }
            }
            
            animationId = requestAnimationFrame(render);
        };
        
        render();
        
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Telemetry log simulator (left panel briefing section)
    useEffect(() => {
        const systemTelemetry = [
            "CORE SYNC STABLE | SHIELDS 100%",
            "FIREWALL BLOCK: PORTSCAN DETECTED FROM 192.168.4.1",
            "DECRYPTING PROTOCOL SYNC MATRIX: SECURE",
            "SATELLITE SYNC ESTABLISHED: ACTIVE CHANNEL",
            "DATABASE HANDSHAKE COMPLETED ENCRYPTED",
            "THREAT RATING: EXTREMELY LOW (0.01%)",
            "OPERATING VOLTAGE: 1.15V | INTRA-CELL SYNC",
            "TRANSMISSION LATENCY STABLE AT 14ms"
        ];
        
        const interval = setInterval(() => {
            const randomMsg = systemTelemetry[Math.floor(Math.random() * systemTelemetry.length)];
            const entry = {
                time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
                msg: randomMsg
            };
            setLogs(prev => [...prev.slice(-4), entry]);
        }, 4500);
        return () => clearInterval(interval);
    }, []);

    // Stagger transition on switching modes via GSAP
    const handleToggleMode = () => {
        playAudioEffect('click');
        
        gsap.to('.terminal-form .input-group, .terminal-submit-btn, .terminal-header h2, .terminal-header .status-line', {
            opacity: 0,
            y: 12,
            duration: 0.18,
            stagger: 0.02,
            onComplete: () => {
                setIsLogin(!isLogin);
                setCredentials({ email: '', password: '', username: '' });
                setShowPassword(false);
                
                gsap.fromTo('.terminal-form .input-group, .terminal-submit-btn, .terminal-header h2, .terminal-header .status-line', 
                    { opacity: 0, y: -12 }, 
                    { opacity: 1, y: 0, duration: 0.28, stagger: 0.03 }
                );
            }
        });
    };

    // Submitting the form: Security Scanning HUD overlay
    const handleSubmit = (e) => {
        e.preventDefault();
        playAudioEffect('click');
        setIsScanning(true);
        setScanProgress(0);
        
        const initialLogs = [
            "> ACC_REQUISITION: VERIFYING OPERATOR...",
            "> COMPILING CRYPTOGRAPHIC CREDENTIALS..."
        ];
        setHudLogs(initialLogs);

        // Periodic Scanning Progress and Typewriter Console Logs
        let progressVal = 0;
        const progressInterval = setInterval(() => {
            progressVal += Math.floor(Math.random() * 8) + 4;
            if (progressVal >= 100) {
                progressVal = 100;
                clearInterval(progressInterval);
                
                setHudLogs(prev => [...prev, "> VERIFICATION: OK. SECURE CODES MATCH.", "> TRANSMITTING SECURE AUTH TOKEN..."]);
                
                // Hologram success triggers
                const successTimeout = setTimeout(() => {
                    playAudioEffect('granted');
                    setSuccessState(true);
                    setIsScanning(false);
                    
                    // Set up redirect countdown
                    let count = 3;
                    const countInterval = setInterval(() => {
                        count -= 1;
                        setSuccessCountdown(count);
                        if (count <= 0) {
                            clearInterval(countInterval);
                            navigate('/');
                        }
                    }, 1000);
                    timersRef.current.push(countInterval);
                }, 750);
                timersRef.current.push(successTimeout);
            } else {
                setScanProgress(progressVal);
                
                // Add conditional status console logs based on percentage
                if (progressVal > 15 && progressVal < 25) {
                    setHudLogs(prev => prev.length === 2 ? [...prev, "> SATELLITE HANDSHAKE: INITIATED..."] : prev);
                } else if (progressVal > 38 && progressVal < 48) {
                    setHudLogs(prev => prev.length === 3 ? [...prev, "> [SEC-SYNC] OVERRIDING PROTOCOL GATEWAYS..."] : prev);
                } else if (progressVal > 55 && progressVal < 65) {
                    setHudLogs(prev => prev.length === 4 ? [...prev, "> [DB-CONN] SCANNING BIOMETRIC LOGS..."] : prev);
                } else if (progressVal > 78 && progressVal < 88) {
                    setHudLogs(prev => prev.length === 5 ? [...prev, "> [TOKEN-GEN] PARSING OPERATOR TOKEN..."] : prev);
                }
            }
        }, 120);
        timersRef.current.push(progressInterval);
    };

    return (
        <section className="login-v4-wrapper">
            {/* Interactive Canvas Grid */}
            <canvas ref={canvasRef} className="cyber-canvas" />

            <Link 
                to="/" 
                className="back-to-home"
                onMouseEnter={() => playAudioEffect('hover')}
                onClick={() => playAudioEffect('click')}
            >
                <FontAwesomeIcon icon={faArrowLeft} /> TERMINATE FEED
            </Link>

            {/* BRIEFING SECTION (Left Pane) */}
            <section className="briefing-section">
                <img
                    src={briefingBg}
                    alt="Cybernetic Control Center"
                    className="briefing-bg"
                />

                <div className="briefing-content">
                    <div className="sys-header">
                        <span><FontAwesomeIcon icon={faSatelliteDish} /> SATLINK: SHUTTLE_9</span>
                        <span>LOC: COORDS_F8.2</span>
                        
                        {/* Audio feed toggler */}
                        <button 
                            className={`audio-feed-btn ${audioEnabled ? 'active' : ''}`}
                            onClick={() => {
                                setAudioEnabled(!audioEnabled);
                                // Synthesize click immediately to give user confirmation
                                if (!audioEnabled) {
                                    try {
                                        const ctx = getAudioContext();
                                        if (ctx) {
                                            const osc = ctx.createOscillator();
                                            const gain = ctx.createGain();
                                            osc.connect(gain);
                                            gain.connect(ctx.destination);
                                            osc.frequency.setValueAtTime(1000, ctx.currentTime);
                                            gain.gain.setValueAtTime(0.03, ctx.currentTime);
                                            osc.start();
                                            osc.stop(ctx.currentTime + 0.05);
                                        }
                                    } catch (e) {
                                        console.warn("Audio Context failed to initialize: ", e);
                                    }
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={audioEnabled ? faVolumeHigh : faVolumeXmark} />
                            AUDIO {audioEnabled ? 'ON' : 'OFF'}
                        </button>
                    </div>

                    <div className="brand-logo-container">
                        <span className="brand-logo">FICTION</span>
                        <div className="brand-underline"></div>
                    </div>

                    <div>
                        <h1>CYBERNETIC <span className="highlight">PORTAL.</span></h1>
                    </div>

                    {/* Left pane ticker console log feed */}
                    <div className="mission-log-container">
                        <div className="mission-log">
                            {logs.map((log, idx) => (
                                <div key={idx} className="log-entry">
                                    <span className="log-time">[{log.time}]</span>
                                    <span className="log-message">{log.msg}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* TERMINAL SECTION (Right Pane Form Card) */}
            <section className="terminal-section">
                <div ref={cardRef} className="terminal-container">
                    
                    {/* Corner decorative accents */}
                    <div className="terminal-container-corner-1" style={{top: '6px', right: '6px', borderTop: '2px solid var(--neon-red)', borderRight: '2px solid var(--neon-red)'}}></div>
                    <div className="terminal-container-corner-2" style={{bottom: '6px', left: '6px', borderBottom: '2px solid var(--neon-red)', borderLeft: '2px solid var(--neon-red)'}}></div>

                    {/* HUD Security Decryption Sweep Scanning Screen */}
                    {isScanning && (
                        <div className="hud-scanning-overlay">
                            {/* Scanning laser line */}
                            <div className="hud-laser-line"></div>

                            {/* Rotating radar graphic rings */}
                            <div className="hud-radar-spinner">
                                <div className="hud-radar-circle radar-outer"></div>
                                <div className="hud-radar-circle radar-middle"></div>
                                <div className="hud-radar-circle radar-inner"></div>
                                <div className="radar-core"></div>
                            </div>

                            {/* Typewriter logs feed */}
                            <div className="hud-terminal-feed">
                                {hudLogs.map((hLog, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`hud-feed-line ${hLog.includes('OK') ? 'success' : ''}`}
                                    >
                                        {hLog}
                                    </div>
                                ))}
                            </div>

                            {/* Percentage tracker */}
                            <div className="hud-progress-container">
                                <div className="hud-progress-info">
                                    <span>DECRYPTING SECURE MATRIX</span>
                                    <span>{scanProgress}%</span>
                                </div>
                                <div className="hud-progress-bar-track">
                                    <div className="hud-progress-bar-fill" style={{ width: `${scanProgress}%` }}></div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="terminal-header">
                        <h2>{isLogin ? 'AUTH_IDENT' : 'ENLIST_OPERATIVE'}</h2>
                        <div className="status-line">
                            <div className="status-dot"></div>
                            {isLogin ? 'WAITING FOR ENCRYPTED TRANSMISSION...' : 'OPERATIVE REGISTRY PORTAL READY_'}
                        </div>
                    </div>

                    <form className="terminal-form" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="input-group">
                                <span className="input-index">[01]</span>
                                <span className="input-focus-status">OPERATOR_ID</span>
                                <input
                                    type="text"
                                    placeholder="OPERATOR NAME"
                                    required
                                    value={credentials.username}
                                    onChange={(e) => {
                                        setCredentials({ ...credentials, username: e.target.value });
                                        playAudioEffect('keypress');
                                    }}
                                    onFocus={() => playAudioEffect('hover')}
                                />
                            </div>
                        )}

                        <div className="input-group">
                            <span className="input-index">{isLogin ? '[01]' : '[02]'}</span>
                            <span className="input-focus-status">OPERATOR_EMAIL</span>
                            <input
                                type="email"
                                placeholder="OPERATOR EMAIL"
                                required
                                value={credentials.email}
                                onChange={(e) => {
                                    setCredentials({ ...credentials, email: e.target.value });
                                    playAudioEffect('keypress');
                                }}
                                onFocus={() => playAudioEffect('hover')}
                            />
                        </div>

                        <div className="input-group">
                            <span className="input-index">{isLogin ? '[02]' : '[03]'}</span>
                            <span className="input-focus-status">ACCESS_KEY</span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="ACCESS KEY"
                                required
                                value={credentials.password}
                                onChange={(e) => {
                                    setCredentials({ ...credentials, password: e.target.value });
                                    playAudioEffect('keypress');
                                }}
                                onFocus={() => playAudioEffect('hover')}
                            />
                            
                            {/* Futuristic key-toggle decryptor */}
                            <button
                                type="button"
                                className="key-toggle-btn"
                                onClick={() => {
                                    setShowPassword(!showPassword);
                                    playAudioEffect('click');
                                }}
                            >
                                {showPassword ? 'HIDE_KEY' : 'SHOW_KEY'}
                            </button>
                        </div>

                        <button 
                            type="submit" 
                            className="terminal-submit-btn" 
                            disabled={isScanning}
                            onMouseEnter={() => playAudioEffect('hover')}
                        >
                            {isLogin ? 'INITIALIZE' : 'CONFIRM'}
                        </button>
                    </form>

                    <div className="terminal-footer">
                        <span className="terminal-footer-label">// ACCESS REDIRECT_STATE</span>
                        <button
                            onClick={handleToggleMode}
                            className="toggle-btn"
                            onMouseEnter={() => playAudioEffect('hover')}
                        >
                            {isLogin ? '> NEW OPERATIVE? ENLIST REGISTRY' : '> ALREADY ENLISTED? DECRYPT IDENTITY'}
                        </button>
                    </div>
                </div>
            </section>

            {/* FULL SCREEN SUCCESS HOLOGRAM REDIRECT SCREEN */}
            {successState && (
                <div className="hologram-success-overlay">
                    <div className="holo-laser-sweep"></div>
                    <div className="holo-card">
                        <div className="holo-glow-ring">
                            <FontAwesomeIcon icon={faCheck} size="3x" />
                        </div>
                        
                        <h1 className="holo-title">ACCESS GRANTED</h1>
                        <p className="holo-subtitle">{isLogin ? 'OPERATOR BIOMETRICS MATCHED' : 'OPERATIVE SUCCESFULLY REGISTERED IN THE PLATFORM CORE'}</p>
                        
                        <div className="holo-loader-container">
                            <span className="holo-loader-label">SYNCING SECURE CONSOLE MATRIX...</span>
                            <div className="hud-progress-bar-track">
                                <div className="hud-progress-bar-fill" style={{ width: `${((3 - successCountdown) / 3) * 100}%` }}></div>
                            </div>
                            <span style={{ fontSize: '0.7rem', color: '#5f758e', display: 'block', marginTop: '15px', fontFamily: 'var(--font-mono)' }}>
                                TELEPORTING TO SYSTEM IN {successCountdown} SECS...
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default LoginPage;
