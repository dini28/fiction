import { useState, useEffect, useRef } from 'react';

const useScrambleText = (targetText, duration = 2000) => {
    const [text, setText] = useState(targetText);
    const rafRef = useRef(null);

    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // We'll expose a function to start the scramble
    const scramble = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        const startTime = Date.now();

        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        const update = () => {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            const scrambled = targetText.split('').map((char, index) => {
                if (char === ' ') return ' ';
                if (index < targetText.length * progress) {
                    return targetText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            }).join('');

            setText(scrambled);

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(update);
            } else {
                rafRef.current = null;
            }
        };

        rafRef.current = requestAnimationFrame(update);
    };

    return [text, scramble];
};

export default useScrambleText;
