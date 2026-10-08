import { useState, useRef, useEffect } from 'react';
import { useCart } from '../../context/useCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheckCircle, faLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { formatPrice } from '../../utils/formatPrice';
import { useScrollLock } from '../../components/ui/SmoothScroll/scrollLock';
import {
    formatCardNumber,
    formatExpiry,
    formatCvc,
    validateShipping,
    validatePayment
} from './checkoutValidation';
import './CheckoutOverlay.css';

const STEPS = [
    { id: 'shipping', label: 'Shipping' },
    { id: 'payment', label: 'Payment' },
    { id: 'confirmed', label: 'Confirmed' }
];

const EMPTY_SHIPPING = { fullName: '', email: '', address: '', city: '', postalCode: '', country: '' };
const EMPTY_PAYMENT = { cardNumber: '', expiry: '', cvc: '' };
const PAYMENT_FORMATTERS = { cardNumber: formatCardNumber, expiry: formatExpiry, cvc: formatCvc };
const PROCESSING_DELAY_MS = 1800;

const Field = ({ name, label, error, className = '', ...inputProps }) => {
    const id = `checkout-${name}`;
    return (
        <div className={`form-group ${className}`}>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                name={name}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
                {...inputProps}
            />
            {error && <p id={`${id}-error`} className="field-error">{error}</p>}
        </div>
    );
};

const OrderSummary = ({ items, subtotal, shipping, total }) => (
    <div className="order-summary">
        <ul className="order-lines">
            {items.map(item => (
                <li key={item.id}>
                    <img src={item.image} alt="" />
                    <span className="order-line-name">
                        {item.name}
                        <small>Qty {item.quantity}</small>
                    </span>
                    <span className="order-line-price">{formatPrice(item.price * item.quantity)}</span>
                </li>
            ))}
        </ul>
        <dl className="order-totals">
            <div>
                <dt>Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div>
                <dt>Shipping</dt>
                <dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
            </div>
            <div className="order-total">
                <dt>Total</dt>
                <dd>{formatPrice(total)}</dd>
            </div>
        </dl>
    </div>
);

const createOrderId = () => `FG-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;

const CheckoutOverlay = () => {
    const {
        cart,
        cartCount,
        cartSubtotal,
        shippingCost,
        cartTotal,
        isCheckoutOpen,
        closeCheckout,
        openCart,
        clearCart
    } = useCart();

    const [step, setStep] = useState('shipping');
    const [shipping, setShipping] = useState(EMPTY_SHIPPING);
    const [payment, setPayment] = useState(EMPTY_PAYMENT);
    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [order, setOrder] = useState(null);

    const overlayRef = useRef(null);
    const modalRef = useRef(null);
    const processingTimer = useRef(null);

    useScrollLock(isCheckoutOpen);

    useGSAP(() => {
        if (isCheckoutOpen) {
            gsap.set(overlayRef.current, { display: "flex" });
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, pointerEvents: "auto" });
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
                    setPayment(EMPTY_PAYMENT);
                    setErrors({});
                    setStep(current => current === 'confirmed' ? 'shipping' : current);
                }
            });
        }
    }, { dependencies: [isCheckoutOpen], scope: overlayRef });

    useEffect(() => {
        if (!isCheckoutOpen) return;
        modalRef.current?.querySelector('input, .action-btn')?.focus({ preventScroll: true });
    }, [isCheckoutOpen, step]);

    useEffect(() => {
        if (!isCheckoutOpen || isProcessing) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeCheckout();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isCheckoutOpen, isProcessing, closeCheckout]);

    useEffect(() => () => clearTimeout(processingTimer.current), []);

    const handleClose = () => {
        if (!isProcessing) closeCheckout();
    };

    const handleEditCart = () => {
        closeCheckout();
        openCart();
    };

    const focusFirstError = (fieldErrors) => {
        const [firstInvalid] = Object.keys(fieldErrors);
        modalRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
    };

    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShipping(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPayment(prev => ({ ...prev, [name]: PAYMENT_FORMATTERS[name](value) }));
        setErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const submitShipping = (e) => {
        e.preventDefault();
        const fieldErrors = validateShipping(shipping);
        setErrors(fieldErrors);
        if (Object.keys(fieldErrors).length > 0) {
            focusFirstError(fieldErrors);
            return;
        }
        setStep('payment');
    };

    const submitPayment = (e) => {
        e.preventDefault();
        const fieldErrors = validatePayment(payment);
        setErrors(fieldErrors);
        if (Object.keys(fieldErrors).length > 0) {
            focusFirstError(fieldErrors);
            return;
        }

        const placedOrder = {
            id: createOrderId(),
            items: cart,
            subtotal: cartSubtotal,
            shipping: shippingCost,
            total: cartTotal,
            shipTo: shipping
        };

        setIsProcessing(true);
        processingTimer.current = setTimeout(() => {
            setOrder(placedOrder);
            setIsProcessing(false);
            setPayment(EMPTY_PAYMENT);
            setStep('confirmed');
            clearCart();
        }, PROCESSING_DELAY_MS);
    };

    const currentStepIndex = STEPS.findIndex(s => s.id === step);

    return (
        <div
            ref={overlayRef}
            className="checkout-overlay"
            onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
            <div
                ref={modalRef}
                className="checkout-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="checkout-title"
                data-lenis-prevent
            >
                <button
                    className="close-checkout-btn"
                    onClick={handleClose}
                    disabled={isProcessing}
                    aria-label="Close checkout"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>

                <ol className="checkout-steps">
                    {STEPS.map((s, index) => (
                        <li
                            key={s.id}
                            className={`${index === currentStepIndex ? 'is-active' : ''} ${index < currentStepIndex ? 'is-complete' : ''}`}
                            aria-current={index === currentStepIndex ? 'step' : undefined}
                        >
                            <span className="checkout-step-index">{index + 1}</span>
                            {s.label}
                        </li>
                    ))}
                </ol>

                {step === 'shipping' && (
                    <div className="checkout-step">
                        <div className="step-header">
                            <h2 id="checkout-title">Shipping details</h2>
                            <p>
                                {cartCount} {cartCount === 1 ? 'item' : 'items'} · <span>{formatPrice(cartTotal)}</span>
                                <button type="button" className="text-btn" onClick={handleEditCart}>Edit cart</button>
                            </p>
                        </div>
                        <form onSubmit={submitShipping} noValidate>
                            <Field name="fullName" label="Full name" autoComplete="name"
                                value={shipping.fullName} onChange={handleShippingChange} error={errors.fullName} />
                            <Field name="email" label="Email" type="email" autoComplete="email"
                                value={shipping.email} onChange={handleShippingChange} error={errors.email} />
                            <Field name="address" label="Street address" autoComplete="street-address"
                                value={shipping.address} onChange={handleShippingChange} error={errors.address} />
                            <div className="form-row">
                                <Field name="city" label="City" autoComplete="address-level2"
                                    value={shipping.city} onChange={handleShippingChange} error={errors.city} />
                                <Field name="postalCode" label="Postal code" autoComplete="postal-code"
                                    value={shipping.postalCode} onChange={handleShippingChange} error={errors.postalCode} />
                            </div>
                            <Field name="country" label="Country" autoComplete="country-name"
                                value={shipping.country} onChange={handleShippingChange} error={errors.country} />
                            <button type="submit" className="action-btn">
                                Continue to payment
                            </button>
                        </form>
                    </div>
                )}

                {step === 'payment' && (
                    <div className="checkout-step">
                        <div className="step-header">
                            <h2 id="checkout-title">Review & pay</h2>
                        </div>

                        <div className="ship-to">
                            <div>
                                <span className="ship-to-label">Ship to</span>
                                <p>{shipping.fullName}, {shipping.address}, {shipping.city} {shipping.postalCode}, {shipping.country}</p>
                            </div>
                            <button type="button" className="text-btn" onClick={() => setStep('shipping')} disabled={isProcessing}>
                                Edit
                            </button>
                        </div>

                        <OrderSummary items={cart} subtotal={cartSubtotal} shipping={shippingCost} total={cartTotal} />

                        <form onSubmit={submitPayment} noValidate>
                            <Field name="cardNumber" label="Card number" inputMode="numeric" autoComplete="cc-number"
                                placeholder="1234 5678 9012 3456" value={payment.cardNumber}
                                onChange={handlePaymentChange} error={errors.cardNumber} disabled={isProcessing} />
                            <div className="form-row">
                                <Field name="expiry" label="Expiry" inputMode="numeric" autoComplete="cc-exp"
                                    placeholder="MM/YY" value={payment.expiry}
                                    onChange={handlePaymentChange} error={errors.expiry} disabled={isProcessing} />
                                <Field name="cvc" label="CVC" inputMode="numeric" autoComplete="cc-csc"
                                    placeholder="123" value={payment.cvc}
                                    onChange={handlePaymentChange} error={errors.cvc} disabled={isProcessing} />
                            </div>
                            <p className="demo-note">
                                <FontAwesomeIcon icon={faLock} />
                                Demo store: no payment is taken. Use test card 4242 4242 4242 4242.
                            </p>
                            <div className="form-actions">
                                <button
                                    type="button"
                                    className="secondary-btn"
                                    onClick={() => setStep('shipping')}
                                    disabled={isProcessing}
                                    aria-label="Back to shipping"
                                >
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </button>
                                <button type="submit" className="action-btn" disabled={isProcessing || cart.length === 0}>
                                    {isProcessing ? 'Processing…' : `Pay ${formatPrice(cartTotal)}`}
                                    {isProcessing && <div className="spinner"></div>}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {step === 'confirmed' && order && (
                    <div className="checkout-step step-success">
                        <div className="success-icon">
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                        <h2 id="checkout-title">Order confirmed</h2>
                        <p>Thanks, {order.shipTo.fullName.split(' ')[0]}. Your gear ships to {order.shipTo.city}, {order.shipTo.country}.</p>
                        <div className="receipt-box">
                            <span>Order number</span>
                            <strong>{order.id}</strong>
                        </div>
                        <OrderSummary items={order.items} subtotal={order.subtotal} shipping={order.shipping} total={order.total} />
                        <button className="action-btn" onClick={closeCheckout}>
                            Continue shopping
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutOverlay;
