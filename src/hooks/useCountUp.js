import { useRef, useState, useEffect } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const useCountUp = (endValue, duration = 2) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef(null);

    useEffect(() => {
        const el = elementRef.current;
        if (!el) return;

        const trigger = ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            once: true,
            onEnter: () => {
                const obj = { val: 0 };

                gsap.to(obj, {
                    val: endValue,
                    duration,
                    ease: "power2.out",
                    onUpdate: () => {
                        setCount(Math.floor(obj.val));
                    }
                });
            }
        });

        return () => {
            trigger.kill();
        };
    }, [endValue, duration]);

    return { count, elementRef };
};

export default useCountUp;
