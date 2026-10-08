import { useState, useEffect, useMemo, useCallback } from 'react';
import { CartContext } from './useCart';
import { armoryData } from '../features/armory/data/ArmoryData';
import { MAX_QUANTITY_PER_ITEM, getShippingCost } from '../features/cart/cartPricing';

const STORAGE_KEY = 'fiction_cart';

const productsById = new Map(armoryData.products.map(product => [product.id, product]));

const clampQuantity = (quantity) => Math.min(Math.max(quantity, 0), MAX_QUANTITY_PER_ITEM);

// Only ids and quantities are persisted so prices and images always come from the live catalog.
const loadCart = () => {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
        if (!Array.isArray(saved)) return [];
        return saved
            .filter(line => productsById.has(line?.id) && line.quantity > 0)
            .map(line => ({ id: line.id, quantity: clampQuantity(line.quantity) }));
    } catch (error) {
        console.error("Failed to load cart from local storage", error);
        return [];
    }
};

export const CartProvider = ({ children }) => {
    const [lines, setLines] = useState(loadCart);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [lastAdded, setLastAdded] = useState(null);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
        } catch (error) {
            console.error("Failed to save cart to local storage", error);
        }
    }, [lines]);

    const cart = useMemo(
        () => lines.map(line => ({ ...productsById.get(line.id), quantity: line.quantity })),
        [lines]
    );

    const addToCart = (product) => {
        const existing = lines.find(line => line.id === product.id);
        if (existing && existing.quantity >= MAX_QUANTITY_PER_ITEM) return;

        setLines(prev => existing
            ? prev.map(line => line.id === product.id ? { ...line, quantity: clampQuantity(line.quantity + 1) } : line)
            : [...prev, { id: product.id, quantity: 1 }]
        );
        setLastAdded({ product, quantity: (existing?.quantity ?? 0) + 1, key: Date.now() });
    };

    const removeFromCart = (productId) => {
        setLines(prev => prev.filter(line => line.id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setLines(prev => prev
            .map(line => line.id === productId ? { ...line, quantity: clampQuantity(line.quantity + delta) } : line)
            .filter(line => line.quantity > 0)
        );
    };

    const clearCart = () => setLines([]);

    const openCart = () => {
        setLastAdded(null);
        setIsCartOpen(true);
    };
    const closeCart = useCallback(() => setIsCartOpen(false), []);
    const dismissLastAdded = useCallback(() => setLastAdded(null), []);

    const openCheckout = () => {
        if (lines.length === 0) return;
        setLastAdded(null);
        setIsCartOpen(false);
        setIsCheckoutOpen(true);
    };
    const closeCheckout = useCallback(() => setIsCheckoutOpen(false), []);

    const cartCount = lines.reduce((total, line) => total + line.quantity, 0);
    const cartSubtotal = Math.round(
        cart.reduce((total, item) => total + Math.round(item.price * 100) * item.quantity, 0)
    ) / 100;
    const shippingCost = getShippingCost(cartSubtotal);
    const cartTotal = Math.round((cartSubtotal + shippingCost) * 100) / 100;

    const value = {
        cart,
        cartCount,
        cartSubtotal,
        shippingCost,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        lastAdded,
        dismissLastAdded
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
