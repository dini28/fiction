import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';
import { registerLenis } from './scrollLock';

const SmoothScroll = ({ children }) => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        // Sync ScrollTrigger with Lenis
        lenis.on('scroll', ScrollTrigger.update);

        const onTick = (time) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(onTick);

        gsap.ticker.lagSmoothing(0);

        const unregister = registerLenis(lenis);

        return () => {
            unregister();
            gsap.ticker.remove(onTick);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
