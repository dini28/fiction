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

        // Hide default cursor
        document.body.style.cursor = 'none';

        // Use a "quickSetter" for performance on the main dot
        const setCursorX = gsap.quickSetter(cursor, "x", "px");
        const setCursorY = gsap.quickSetter(cursor, "y", "px");

        // The follower lags slightly
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

        // Add listeners
        window.addEventListener('mousemove', onMouseMove);

        // Add hover listeners to interactive elements
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

    // Re-attach listeners when DOM updates (simple mutation observer alternative or just re-run on path change)
    // For now we'll stick to a simple effect, but in a production app we might use a Context to track location changes.

    useEffect(() => {
        // Dynamically update hover state for newly added elements handled by React Router etc?
        // This is a naive implementation, good for "phase 1".
        const updateListeners = () => {
            const interactiveElements = document.querySelectorAll('a, button, input');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => setIsHovering(true));
                el.addEventListener('mouseleave', () => setIsHovering(false));
            });
        };

        // Run periodically or on route change if we had access to location here.
        const interval = setInterval(updateListeners, 2000);
        return () => clearInterval(interval);
    }, []);


    return (
        <>
            <div ref={cursorRef} className={`custom-cursor-dot ${isHovering ? 'hover' : ''}`}></div>
            <div ref={followerRef} className={`custom-cursor-follower ${isHovering ? 'hover' : ''}`}></div>
        </>
    );
};

export default CustomCursor;
