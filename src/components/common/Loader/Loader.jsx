import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Loader.css';

const Loader = ({ onComplete, loadingProgress = null }) => {
    const loaderRef = useRef(null);
    const progressRef = useRef(null);
    const textRef = useRef(null);
    const bgRef = useRef(null);
    const [currentText, setCurrentText] = useState('LOADING');

    useGSAP(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
            }
        });

        gsap.set(progressRef.current, { scaleX: 0 });

        tl.call(() => setCurrentText('INITIALIZING SYSTEM'), null, 0.2);

        if (loadingProgress === null) {
            tl.to(progressRef.current, {
                scaleX: 1,
                duration: prefersReducedMotion ? 1 : 2.5,
                ease: "power2.out"
            }, 0.5);
        }

        tl.call(() => setCurrentText('SYSTEM READY'), null, prefersReducedMotion ? 2 : 3);

        if (!prefersReducedMotion) {
            tl.to(textRef.current, {
                duration: 0.05,
                x: '+=2',
                repeat: 5,
                yoyo: true,
                ease: "power1.inOut"
            }, 3.2);
        }

        tl.to(bgRef.current, {
            yPercent: -100,
            duration: prefersReducedMotion ? 0.5 : 1.2,
            ease: "power4.inOut",
            delay: prefersReducedMotion ? 0.5 : 1
        });

        tl.set(loaderRef.current, {
            display: 'none'
        });

    }, { scope: loaderRef, dependencies: [loadingProgress] });

    useGSAP(() => {
        if (loadingProgress !== null && progressRef.current) {
            gsap.to(progressRef.current, {
                scaleX: loadingProgress / 100,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    }, { dependencies: [loadingProgress] });

    return (
        <div ref={loaderRef} className="loader-container">
            <div ref={bgRef} className="loader-bg">
                <div className="loader-content">
                    <div ref={textRef} className="loader-text">
                        {currentText}
                        <span className="cursor-blink"></span>
                    </div>

                    <div className="progress-bar-track">
                        <div ref={progressRef} className="progress-bar-fill"></div>
                    </div>

                    {loadingProgress !== null && (
                        <div className="progress-percentage">
                            {Math.round(loadingProgress)}%
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Loader;