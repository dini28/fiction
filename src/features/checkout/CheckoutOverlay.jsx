import { useState, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheckCircle, faShieldAlt, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './CheckoutOverlay.css';

const CheckoutOverlay = () => {
    const { isCheckoutOpen, closeCheckout, clearCart, cartTotal } = useCart();
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    const overlayRef = useRef(null);
    const modalRef = useRef(null);

    useGSAP(() => {
        if (isCheckoutOpen) {
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, pointerEvents: "auto", display: "flex" });
            gsap.fromTo(modalRef.current,
                { y: 50, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)" }
            );
        } else {
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.3,
                pointerEvents: "none",
                onComplete: () => {
                    gsap.set(overlayRef.current, { display: "none" });
                    setStep(1); // Reset step on close
                }
            });
        }
    }, { dependencies: [isCheckoutOpen], scope: overlayRef });

    const handlePayment = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Mock API call
        setTimeout(() => {
            setIsProcessing(false);
            setStep(3); // Success step
            clearCart();
        }, 2000);
    };

    return (
        <div ref={overlayRef} className="checkout-overlay">
            <div ref={modalRef} className="checkout-modal">
                <button className="close-checkout-btn" onClick={closeCheckout}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>

                {step === 1 && (
                    <div className="checkout-step step-identity">
                        <div className="step-header">
                            <FontAwesomeIcon icon={faShieldAlt} className="step-icon" />
                            <h2>IDENTITY VERIFICATION</h2>
                            <p>Confirm operative details for delivery.</p>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                            <div className="form-group">
                                <label>CODENAME / FULL NAME</label>
                                <input type="text" required placeholder="OPERATIVE NAME" />
                            </div>
                            <div className="form-group">
                                <label>SECTOR / ADDRESS</label>
                                <input type="text" required placeholder="DELIVERY SECTOR" />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>ZONE / CITY</label>
                                    <input type="text" required placeholder="CITY" />
                                </div>
                                <div className="form-group">
                                    <label>POSTAL CODE</label>
                                    <input type="text" required placeholder="ZIP" />
                                </div>
                            </div>
                            <button type="submit" className="action-btn">
                                PROCEED TO ALLOCATION
                            </button>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div className="checkout-step step-payment">
                        <div className="step-header">
                            <FontAwesomeIcon icon={faCreditCard} className="step-icon" />
                            <h2>RESOURCE ALLOCATION</h2>
                            <p>Authorize transfer of <span>${cartTotal.toLocaleString()}</span> credits.</p>
                        </div>
                        <form onSubmit={handlePayment}>
                            <div className="form-group">
                                <label>CARD NUMBER</label>
                                <input type="text" placeholder="0000 0000 0000 0000" maxLength="19" required />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>EXPIRY</label>
                                    <input type="text" placeholder="MM/YY" maxLength="5" required />
                                </div>
                                <div className="form-group">
                                    <label>CVC</label>
                                    <input type="text" placeholder="123" maxLength="3" required />
                                </div>
                            </div>
                            <button type="submit" className="action-btn pay-btn" disabled={isProcessing}>
                                {isProcessing ? 'AUTHORIZING...' : `CONFIRM TRANSFER ($${cartTotal.toLocaleString()})`}
                                {isProcessing && <div className="spinner"></div>}
                            </button>
                        </form>
                    </div>
                )}

                {step === 3 && (
                    <div className="checkout-step step-success">
                        <div className="success-icon">
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                        <h2>TRANSACTION COMPLETE</h2>
                        <p>Assets have been requisitioned. Prepare for deployment.</p>
                        <div className="receipt-box">
                            <span>ORDER ID:</span>
                            <strong>#{Math.random().toString(36).substr(2, 9).toUpperCase()}</strong>
                        </div>
                        <button className="action-btn" onClick={closeCheckout}>
                            RETURN TO BASE
                        </button>
                    </div>
                )}

                <div className="checkout-progress">
                    <div className={`progress-dot ${step >= 1 ? 'active' : ''}`}></div>
                    <div className={`progress-line ${step >= 2 ? 'active' : ''}`}></div>
                    <div className={`progress-dot ${step >= 2 ? 'active' : ''}`}></div>
                    <div className={`progress-line ${step >= 3 ? 'active' : ''}`}></div>
                    <div className={`progress-dot ${step >= 3 ? 'active' : ''}`}></div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutOverlay;
