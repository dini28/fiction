import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Newsletter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSatelliteDish, 
    faServer, 
    faCheck
} from '@fortawesome/free-solid-svg-icons';

gsap.registerPlugin(ScrollTrigger);

const Newsletter = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [email, setEmail] = useState('');
    const [syncProgress, setSyncProgress] = useState(0);
    const [syncLogs, setSyncLogs] = useState([]);
    const [operativeToken, setOperativeToken] = useState('');
    
    const containerRef = useRef();

    // GSAP ScrollTrigger intro animations
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(".newsletter-card", {
            scale: 0.95,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out"
        })
        .from(".hologram-svg-wrapper", {
            rotation: -45,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out"
        }, "-=0.6")
        .from(".newsletter-title", {
            y: 30,
            opacity: 0,
            duration: 0.6,
            skewX: 5
        }, "-=0.8")
        .from(".newsletter-desc", {
            y: 20,
            opacity: 0,
            duration: 0.5
        }, "-=0.5")
        .from(".newsletter-form, .signal-visualizer-container", {
            y: 15,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1
        }, "-=0.3");

        ScrollTrigger.refresh();
    }, { scope: containerRef });

    // Handle submit decryption console sequence
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setIsSyncing(true);
            setSyncProgress(0);
            
            const initialLogs = [
                "> INITIALIZING DROPS LINK TUNNEL...",
                "> SCANNING OPERATIVE NETWORK LINK..."
            ];
            setSyncLogs(initialLogs);

            let progressVal = 0;
            const progressInterval = setInterval(() => {
                progressVal += Math.floor(Math.random() * 10) + 5;
                if (progressVal >= 100) {
                    progressVal = 100;
                    clearInterval(progressInterval);

                    setSyncLogs(prev => [
                        ...prev, 
                        "> AUTHENTICATION: SUCCESSFUL.",
                        "> SECURE FREQUENCY LOCKED."
                    ]);

                    // Generate a high-tech custom random Operator Token
                    const randomToken = "FCT-" + Math.random().toString(36).substring(2, 8).toUpperCase();
                    setOperativeToken(randomToken);

                    // Fade to success card state
                    setTimeout(() => {
                        gsap.to(".newsletter-card > *", {
                            opacity: 0,
                            y: -15,
                            duration: 0.35,
                            onComplete: () => {
                                setIsSyncing(false);
                                setIsSubmitted(true);
                                
                                gsap.fromTo(".operative-success-card", 
                                    { opacity: 0, scale: 0.95 },
                                    { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
                                );
                            }
                        });
                    }, 600);

                } else {
                    setSyncProgress(progressVal);

                    // Inject realistic tech logs at different percentage points
                    if (progressVal > 20 && progressVal < 35) {
                        setSyncLogs(prev => prev.length === 2 ? [...prev, "> SATELLITE APOGEE COMPILING: ACTIVE"] : prev);
                    } else if (progressVal > 45 && progressVal < 60) {
                        setSyncLogs(prev => prev.length === 3 ? [...prev, "> BYPASSING CLOUD SECURE DECK GATEWAYS..."] : prev);
                    } else if (progressVal > 70 && progressVal < 85) {
                        setSyncLogs(prev => prev.length === 4 ? [...prev, "> ENCRYPTING FREQUENCY HANDSHAKE: IN PROGRESS"] : prev);
                    }
                }
            }, 100);
        }
    };

    return (
        <section className="newsletter-section" ref={containerRef}>
            <div className="newsletter-content">
                {!isSubmitted ? (
                    <div className="newsletter-card">
                        
                        {/* DECRYPTION SYNC HUD OVERLAY */}
                        {isSyncing && (
                            <div className="sync-terminal-overlay">
                                <div className="sync-laser-line"></div>
                                <div className="sync-logs-feed">
                                    {syncLogs.map((log, idx) => (
                                        <div 
                                            key={idx} 
                                            className={`sync-log-row ${log.includes('SUCCESSFUL') ? 'success' : ''}`}
                                        >
                                            {log}
                                        </div>
                                    ))}
                                </div>
                                <div className="sync-progress-tracker">
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span>UPLINK TRANSMISSION STATUS</span>
                                        <span>{syncProgress}%</span>
                                    </div>
                                    <div className="sync-progress-bar">
                                        <div className="sync-progress-bar-fill" style={{ width: `${syncProgress}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Left Interactive Widget Area */}
                        <div className="newsletter-widget-pane">
                            <div className="hologram-svg-wrapper">
                                {/* SVG concentric satellite rings rotating dynamically */}
                                <svg className="holo-svg-ring ring-fast" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="45" stroke="var(--newsletter-cyan)" strokeWidth="0.8" strokeDasharray="3 6"/>
                                    <circle cx="50" cy="50" r="40" stroke="rgba(0, 243, 255, 0.2)" strokeWidth="0.5"/>
                                    <path d="M 50,5 A 45,45 0 0,1 95,50" stroke="var(--newsletter-cyan)" strokeWidth="1.5" strokeLinecap="round"/>
                                    <text x="35" y="48" fill="var(--newsletter-cyan)" fontSize="4" fontFamily="Share Tech Mono" letterSpacing="0.5">SAT_LINK</text>
                                </svg>
                                <svg className="holo-svg-ring ring-slow" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="32" stroke="var(--newsletter-red)" strokeWidth="1.2" strokeDasharray="12 4"/>
                                    <circle cx="50" cy="50" r="28" stroke="rgba(255, 70, 85, 0.15)" strokeWidth="0.5"/>
                                    <path d="M 50,82 A 32,32 0 0,1 18,50" stroke="var(--newsletter-red)" strokeWidth="2" strokeLinecap="round"/>
                                    <text x="38" y="58" fill="var(--newsletter-red)" fontSize="4.5" fontFamily="Share Tech Mono" fontWeight="bold">0x8F</text>
                                </svg>
                                <svg className="holo-svg-ring ring-inner" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="18" stroke="var(--newsletter-cyan)" strokeWidth="0.8" strokeDasharray="1 3"/>
                                    <circle cx="50" cy="50" r="6" fill="var(--newsletter-cyan)" opacity="0.85"/>
                                </svg>
                            </div>
                            <span style={{ fontSize: '0.6rem', color: '#4c566a', fontFamily: 'Share Tech Mono', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                // NODE ID: DROPS_0xFB9A
                            </span>
                        </div>

                        {/* Right Form Area */}
                        <div className="newsletter-form-pane">
                            <div className="newsletter-card-header">
                                <span className="card-tag"><FontAwesomeIcon icon={faSatelliteDish} /> SAT_INTEL_NETWORK</span>
                                <h2 className="newsletter-title" data-text="SECURE THE DROPS">SECURE THE DROPS</h2>
                                <p className="newsletter-desc">Enlist your frequency index for immediate intelligence drops, restricted prototypes, and priority transmissions.</p>
                            </div>

                            <form className="newsletter-form" onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    placeholder='ENTER OPERATOR EMAIL...'
                                    className="newsletter-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button type="submit" className="newsletter-btn">
                                    <span className="btn-text">INITIALIZE</span>
                                </button>
                            </form>

                            {/* Active typing signal visualization bar */}
                            <div className="signal-visualizer-container" style={{ marginTop: '12px' }}>
                                <div className="signal-wave">
                                    <div className="signal-bar"></div>
                                    <div className="signal-bar"></div>
                                    <div className="signal-bar"></div>
                                    <div className="signal-bar"></div>
                                    <div className="signal-bar"></div>
                                </div>
                                <span className="signal-status">
                                    {email ? `FREQUENCY INTENSITY: LOCKING [${Math.min(100, email.length * 4)}MHz]` : 'FREQUENCY INTENSITY: COLD_'}
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Futuristic Operative Access Hologram Success Card
                    <div className="operative-success-card">
                        
                        {/* Left visual profile slot */}
                        <div className="success-badge-left">
                            <div className="success-circle-ripple">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                            <span className="success-status-tag">SECURE_LINK</span>
                        </div>

                        {/* Right detailed confirmation */}
                        <div className="success-info-right">
                            <span style={{ fontSize: '0.65rem', color: 'var(--newsletter-green)', fontFamily: 'Share Tech Mono', letterSpacing: '2.5px', display: 'block', marginBottom: '8px' }}>
                                <FontAwesomeIcon icon={faServer} /> SECURE CLOUD GATEWAY ESTABLISHED
                            </span>
                            <h3>UPLINK ONLINE</h3>
                            <p>Operator frequency successfully indexed and linked. Restricted blueprints and system notifications are locked to: <strong style={{ color: 'white' }}>{email}</strong>.</p>
                            
                            {/* Glitching Operator token */}
                            <div className="success-token-badge">
                                OP_ACCESS_TOKEN: <strong>{operativeToken}</strong>
                            </div>

                            <button
                                className="reset-btn"
                                onClick={() => {
                                    gsap.to(".operative-success-card", {
                                        opacity: 0,
                                        scale: 0.95,
                                        duration: 0.3,
                                        onComplete: () => {
                                            setIsSubmitted(false);
                                            setEmail('');
                                            setSyncLogs([]);
                                        }
                                    });
                                }}
                            >
                                <span className="btn-text">LINK ANOTHER CORE</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Newsletter;
