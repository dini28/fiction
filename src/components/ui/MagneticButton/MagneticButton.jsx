import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './MagneticButton.css';

const MagneticButton = ({ children, className = '', onClick, href, ...props }) => {
    const buttonRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        const button = buttonRef.current;
        const text = textRef.current;
        if (!button) return;

        const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const textXTo = gsap.quickTo(text, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const textYTo = gsap.quickTo(text, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = button.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x * 0.35); // Move button slightly
            yTo(y * 0.35);

            if (text) {
                textXTo(x * 0.1); // Move text slightly less for parallax
                textYTo(y * 0.1);
            }
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
            if (text) {
                textXTo(0);
                textYTo(0);
            }
        };

        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            button.removeEventListener("mousemove", handleMouseMove);
            button.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, { scope: buttonRef });

    const Component = href ? 'a' : 'button';

    return (
        <Component
            ref={buttonRef}
            href={href}
            className={`magnetic-btn ${className}`}
            onClick={onClick}
            {...props}
        >
            <span ref={textRef} className="magnetic-text-wrapper">
                {children}
            </span>
        </Component>
    );
};

export default MagneticButton;
