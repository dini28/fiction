import { useEffect } from 'react';

let lenisInstance = null;

export const registerLenis = (lenis) => {
    lenisInstance = lenis;
    return () => {
        if (lenisInstance === lenis) lenisInstance = null;
    };
};

// Scrollable children of a locked overlay need `data-lenis-prevent` to keep native scrolling.
export const useScrollLock = (locked) => {
    useEffect(() => {
        const lenis = lenisInstance;
        if (!locked || !lenis) return;
        lenis.stop();
        return () => lenis.start();
    }, [locked]);
};
