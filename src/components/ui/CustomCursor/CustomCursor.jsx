import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
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

        const onMouseEnterLink = () => setIsHovering(true);
        const onMouseLeaveLink = () => setIsHovering(false);

        window.addEventListener('mousemove', onMouseMove);

        const interactiveElements = document.querySelectorAll('a, button, .clickable, input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', onMouseEnterLink);
            el.addEventListener('mouseleave', onMouseLeaveLink);
        });

        // Clean up
        return () => {
            document.body.style.cursor = 'auto'; // Restore cursor
            window.removeEventListener('mousemove', onMouseMove);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnterLink);
                el.removeEventListener('mouseleave', onMouseLeaveLink);
            });
        };
    }, []);

    useEffect(() => {
        const updateListeners = () => {
            const interactiveElements = document.querySelectorAll('a, button, input');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => setIsHovering(true));
                el.addEventListener('mouseleave', () => setIsHovering(false));
            });
        };

        const interval = setInterval(updateListeners, 2000);
        return () => clearInterval(interval);
    }, []);


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
