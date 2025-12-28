import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const dotRef = useRef(null);
    const [isActive, setIsActive] = useState(false);

    useGSAP(() => {
        const cursor = cursorRef.current;
        const dot = dotRef.current;

        if (!cursor || !dot) return;

        // Use quickTo for high performance mouse following
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

        const xToDot = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power3" });
        const yToDot = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power3" });

        const onMouseMove = (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
            xToDot(e.clientX);
            yToDot(e.clientY);
        };

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    useEffect(() => {
        // Add hover listeners to clickable elements
        const handleMouseEnter = () => setIsActive(true);
        const handleMouseLeave = () => setIsActive(false);

        const clickableElements = document.querySelectorAll('a, button, .interactive, .game-card, .news-item');

        clickableElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        // Cleanup and re-bind on mutations (optional, but good for dynamic content)
        // For simplicity, we just bind once here. 
        // In a real app, might want a MutationObserver or event delegation.

        return () => {
            clickableElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    });

    return (
        <>
            <div ref={cursorRef} className={`custom-cursor ${isActive ? 'active' : ''}`}></div>
            <div ref={dotRef} className="custom-cursor-dot"></div>
        </>
    );
};

export default CustomCursor;
