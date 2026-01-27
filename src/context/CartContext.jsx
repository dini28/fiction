import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('fiction_cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Failed to load cart from local storage", error);
            return [];
        }
    });

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    useEffect(() => {
        try {
            localStorage.setItem('fiction_cart', JSON.stringify(cart));
        } catch (error) {
            console.error("Failed to save cart to local storage", error);
        }
    }, [cart]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true); // Open cart when item is added
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCart(prevCart => prevCart.map(item => {
            if (item.id === productId) {
                const newQuantity = Math.max(0, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }).filter(item => item.quantity > 0)); // Remove if quantity becomes 0
    };

    const clearCart = () => {
        setCart([]);
    };

    const toggleCart = () => setIsCartOpen(prev => !prev);
    const closeCart = () => setIsCartOpen(false);
    const openCart = () => setIsCartOpen(true);

    const openCheckout = () => {
        setIsCartOpen(false);
        setIsCheckoutOpen(true);
    };
    const closeCheckout = () => setIsCheckoutOpen(false);

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    const value = {
        cart,
        isCartOpen,
        isCheckoutOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart,
        openCart,
        openCheckout,
        closeCheckout,
        cartCount,
        cartTotal
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
