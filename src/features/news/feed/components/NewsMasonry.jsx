import { useRef, useEffect } from "react";
import gsap from "gsap";

const NewsMasonry = ({ items, onNewsClick }) => {

    // Optional: Add simple entry animation
    useEffect(() => {
        gsap.from(".news-card", {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "all" // Clear so hover effects work
        });
    }, []);

    return (
        <div className="news-masonry">
            {items?.map((item) => (
                <div
                    key={item.id}
                    className="news-card clickable"
                    onClick={() => onNewsClick && onNewsClick(item)}
                    role="button"
                    tabIndex={0}
                >
                    <div className="card-header">
                        <span className={`card-tag ${item.type === 'featured' ? 'highlight' : ''}`}>
                            {item.category}
                        </span>
                        <span className="card-date">{item.date}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description || "In-depth intelligence report pending. Operator discretion advised."}</p>

                    {item.image && (
                        <div className="card-image-wrapper">
                            <img src={item.image} alt={item.title} className="card-image" />
                        </div>
                    )}

                    <div className="card-footer">
                        <span className="read-time">READ INTEL</span>
                        <div className="card-arrow"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsMasonry;
