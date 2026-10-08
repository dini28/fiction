import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../context/useCart';
import './CartToast.css';

const TOAST_DURATION_MS = 4000;

const CartToast = () => {
    const { lastAdded, dismissLastAdded, openCart, isCartOpen, isCheckoutOpen } = useCart();

    useEffect(() => {
        if (!lastAdded) return;
        const timer = setTimeout(dismissLastAdded, TOAST_DURATION_MS);
        return () => clearTimeout(timer);
    }, [lastAdded, dismissLastAdded]);

    const isVisible = lastAdded && !isCartOpen && !isCheckoutOpen;

    return (
        <div className="cart-toast-region" role="status" aria-live="polite">
            {isVisible && (
                <div key={lastAdded.key} className="cart-toast">
                    <img src={lastAdded.product.image} alt="" className="cart-toast-image" />
                    <div className="cart-toast-body">
                        <span className="cart-toast-eyebrow">
                            <FontAwesomeIcon icon={faCheck} /> Added to cart
                        </span>
                        <p className="cart-toast-name">
                            {lastAdded.product.name}
                            {lastAdded.quantity > 1 && <span> × {lastAdded.quantity}</span>}
                        </p>
                    </div>
                    <button type="button" className="cart-toast-action" onClick={openCart}>
                        View cart
                    </button>
                    <button
                        type="button"
                        className="cart-toast-close"
                        onClick={dismissLastAdded}
                        aria-label="Dismiss"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartToast;
