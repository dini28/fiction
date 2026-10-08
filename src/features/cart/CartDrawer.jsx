import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMinus, faPlus, faTrash, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { formatPrice } from '../../utils/formatPrice';
import { FREE_SHIPPING_THRESHOLD, MAX_QUANTITY_PER_ITEM } from './cartPricing';
import { useScrollLock } from '../../components/ui/SmoothScroll/scrollLock';
import './CartDrawer.css';

const CartDrawer = () => {
    const {
        cart,
        cartCount,
        cartSubtotal,
        shippingCost,
        cartTotal,
        isCartOpen,
        closeCart,
        removeFromCart,
        updateQuantity,
        openCheckout
    } = useCart();

    const drawerRef = useRef(null);
    const overlayRef = useRef(null);
    const closeBtnRef = useRef(null);

    useScrollLock(isCartOpen);

    useGSAP(() => {
        if (isCartOpen) {
            gsap.to(overlayRef.current, {
                opacity: 1,
                duration: 0.3,
                pointerEvents: "auto",
                display: "block"
            });
            gsap.set(drawerRef.current, { display: "flex" });
            gsap.to(drawerRef.current, {
                x: 0,
                duration: 0.4,
                ease: "power3.out"
            });
            closeBtnRef.current?.focus();
        } else {
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.3,
                pointerEvents: "none",
                onComplete: () => gsap.set(overlayRef.current, { display: "none" })
            });
            gsap.to(drawerRef.current, {
                x: "100%",
                duration: 0.4,
                ease: "power3.in",
                onComplete: () => gsap.set(drawerRef.current, { display: "none" })
            });
        }
    }, { dependencies: [isCartOpen], scope: drawerRef });

    useEffect(() => {
        if (!isCartOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeCart();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isCartOpen, closeCart]);

    const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - cartSubtotal, 0);
    const shippingProgress = Math.min(cartSubtotal / FREE_SHIPPING_THRESHOLD, 1) * 100;

    return (
        <>
            <div
                ref={overlayRef}
                className="cart-overlay"
                onClick={closeCart}
                aria-hidden="true"
            ></div>
            <aside
                ref={drawerRef}
                className="cart-drawer"
                role="dialog"
                aria-modal="true"
                aria-labelledby="cart-title"
                data-lenis-prevent
            >
                <div className="cart-header">
                    <h2 id="cart-title">Your cart <span>({cartCount})</span></h2>
                    <button ref={closeBtnRef} className="close-cart-btn" onClick={closeCart} aria-label="Close cart">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                {cart.length > 0 && (
                    <div className="cart-shipping">
                        <p>
                            <FontAwesomeIcon icon={faTruckFast} />
                            {amountToFreeShipping > 0
                                ? <>Add <strong>{formatPrice(amountToFreeShipping)}</strong> for free shipping</>
                                : <>You've unlocked <strong>free shipping</strong></>}
                        </p>
                        <div className="cart-shipping-bar" aria-hidden="true">
                            <span style={{ width: `${shippingProgress}%` }} />
                        </div>
                    </div>
                )}

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <p>Your cart is empty</p>
                            <span>Gear you add from the Armory will show up here.</span>
                            <Link to="/armory" className="empty-cart-link" onClick={closeCart}>
                                Browse the Armory
                            </Link>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="item-image">
                                    <img src={item.image} alt="" />
                                </div>
                                <div className="item-details">
                                    <div className="item-title">
                                        <h3>{item.name}</h3>
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.id)}
                                            aria-label={`Remove ${item.name} from cart`}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                    <p className="item-price">{formatPrice(item.price)}</p>

                                    <div className="item-row">
                                        <div className="quantity-controls">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                aria-label={`Decrease quantity of ${item.name}`}
                                            >
                                                <FontAwesomeIcon icon={faMinus} />
                                            </button>
                                            <span aria-label={`Quantity ${item.quantity}`}>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                disabled={item.quantity >= MAX_QUANTITY_PER_ITEM}
                                                aria-label={`Increase quantity of ${item.name}`}
                                            >
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </div>
                                        <span className="item-line-total">{formatPrice(item.price * item.quantity)}</span>
                                    </div>
                                    {item.quantity >= MAX_QUANTITY_PER_ITEM && (
                                        <p className="item-limit">Limit {MAX_QUANTITY_PER_ITEM} per order</p>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-footer">
                        <dl className="cart-summary">
                            <div>
                                <dt>Subtotal</dt>
                                <dd>{formatPrice(cartSubtotal)}</dd>
                            </div>
                            <div>
                                <dt>Shipping</dt>
                                <dd>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</dd>
                            </div>
                            <div className="cart-total">
                                <dt>Total</dt>
                                <dd className="total-amount">{formatPrice(cartTotal)}</dd>
                            </div>
                        </dl>
                        <button className="checkout-btn" onClick={openCheckout}>
                            Checkout
                            <div className="btn-scanline"></div>
                        </button>
                        <button className="continue-btn" onClick={closeCart}>
                            Continue shopping
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
};

export default CartDrawer;
