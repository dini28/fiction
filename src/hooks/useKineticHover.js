import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const useKineticHover = (intensity = 15) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleMouseMove = (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(el, {
                x: x * (intensity / 100),
                y: y * (intensity / 100),
                rotationX: -y * (intensity / 200),
                rotationY: x * (intensity / 200),
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                duration: 0.5,
                ease: "elastic.out(1, 0.5)"
            });
        };

        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            el.removeEventListener('mousemove', handleMouseMove);
            el.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [intensity]);

    return ref;
};

export default useKineticHover;
