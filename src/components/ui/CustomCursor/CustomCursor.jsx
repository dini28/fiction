import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const INTERACTIVE_SELECTOR = 'a, button, .clickable, input, textarea, select, label';

const hasFinePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (!hasFinePointer) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;

        document.body.style.cursor = 'none';

        const setCursorX = gsap.quickSetter(cursor, "x", "px");
        const setCursorY = gsap.quickSetter(cursor, "y", "px");
        const setFollowerX = gsap.quickTo(follower, "x", { duration: 0.2, ease: "power3" });
        const setFollowerY = gsap.quickTo(follower, "y", { duration: 0.2, ease: "power3" });

        const onMouseMove = (e) => {
            setCursorX(e.clientX);
            setCursorY(e.clientY);
            setFollowerX(e.clientX);
            setFollowerY(e.clientY);
        };

        // Delegated so elements mounted after this effect (route changes, modals) are covered
        const onMouseOver = (e) => {
            setIsHovering(Boolean(e.target.closest?.(INTERACTIVE_SELECTOR)));
        };

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseover', onMouseOver);

        return () => {
            document.body.style.cursor = '';
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', onMouseOver);
        };
    }, []);

    if (!hasFinePointer) return null;

    return (
        <>
            <div ref={cursorRef} className={`custom-cursor-dot ${isHovering ? 'hover' : ''}`}>
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
                </svg>
            </div>
            <div ref={followerRef} className={`custom-cursor-follower ${isHovering ? 'hover' : ''}`}></div>
        </>
    );
};

export default CustomCursor;
