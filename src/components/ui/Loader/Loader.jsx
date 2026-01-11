import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import loaderJson from '../../../assets/images/animation.json';
import './Loader.css';

const Loader = ({ onComplete }) => {
    const loaderRef = useRef(null);
    const contentRef = useRef(null);
    const bgRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            delay: 2.0,
            onComplete: () => {
                if (onComplete) onComplete();
            }
        });

        tl.to(contentRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            ease: "power4.inOut"
        });

        tl.to(bgRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut"
        });

        tl.set(loaderRef.current, {
            display: 'none'
        });

    }, { scope: loaderRef });

    return (
        <div ref={loaderRef} className="loader-container">
            <div ref={bgRef} className="loader-bg">
                <div ref={contentRef} className="loader-content">
                    <div className="lottie-wrapper">
                        <DotLottieReact
                            data={loaderJson}
                            loop
                            autoplay
                        />
                    </div>
                    <div className="loader-text-minimal">
                        INITIALIZING SYSTEM
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
