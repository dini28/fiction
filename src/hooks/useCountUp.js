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

        ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            once: true,
            onEnter: () => {
                let frame = 0;
                gsap.to(event => {
                    // Dummy object to animate
                }, {
                    duration: duration,
                    ease: "power1.out",
                    onUpdate: function () {
                        const progress = this.progress();
                        const current = Math.floor(progress * endValue);
                        setCount(current);
                    }
                });

                // Simpler approach for React state
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: endValue,
                    duration: duration,
                    ease: "power2.out",
                    onUpdate: () => {
                        setCount(Math.floor(obj.val));
                    }
                });
            }
        });
    }, [endValue, duration]);

    return { count, elementRef };
};

export default useCountUp;
