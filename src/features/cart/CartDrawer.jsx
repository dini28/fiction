import { useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './CartDrawer.css';

const CartDrawer = () => {
    const {
        cart,
        isCartOpen,
        closeCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        openCheckout
    } = useCart();

    const drawerRef = useRef(null);
    const overlayRef = useRef(null);

    useGSAP(() => {
        if (isCartOpen) {
            gsap.to(overlayRef.current, {
                opacity: 1,
                duration: 0.3,
                pointerEvents: "auto",
                display: "block"
            });
            gsap.to(drawerRef.current, {
                x: 0,
                duration: 0.4,
                ease: "power3.out"
            });
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
                ease: "power3.in"
            });
        }
    }, { dependencies: [isCartOpen], scope: drawerRef });

    return (
        <>
            <div
                ref={overlayRef}
                className="cart-overlay"
                onClick={closeCart}
            ></div>
            <div ref={drawerRef} className="cart-drawer">
                <div className="cart-header">
                    <h2>REQ_LIST // <span>{cart.length}</span></h2>
                    <button className="close-cart-btn" onClick={closeCart}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <p>NO ASSETS REQUISITIONED</p>
                            <span>Return to armory to equip yourself.</span>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="item-details">
                                    <div className="item-title">
                                        <h3>{item.name}</h3>
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                    <p className="item-price">${item.price}</p>

                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item.id, -1)}>
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-footer">
                    <div className="cart-total">
                        <span>TOTAL_CREDITS</span>
                        <span className="total-amount">${cartTotal.toLocaleString()}</span>
                    </div>
                    <button className="checkout-btn" disabled={cart.length === 0} onClick={openCheckout}>
                        INITIATE TRANSFER
                        <div className="btn-scanline"></div>
                    </button>
                </div>
            </div>
        </>
    );
};

export default CartDrawer;
