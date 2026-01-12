import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './ArmoryPage.css';
import { armoryData } from '../data/armoryData';
import GlobalNoise from '../components/ui/GlobalNoise/GlobalNoise';
import MagneticButton from '../components/ui/MagneticButton/MagneticButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const ArmoryPage = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const containerRef = useRef(null);

    const filteredProducts = activeCategory === 'all'
        ? armoryData.products
        : armoryData.products.filter(p => p.category === activeCategory);

    useGSAP(() => {
        gsap.from(".armory-hero-title", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            delay: 0.2
        });

        gsap.from(".product-card", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.5
        });
    }, { scope: containerRef });

    return (
        <div className="page-wrapper armory-page" ref={containerRef}>
            <GlobalNoise />

            <section className="armory-hero">
                <div className="armory-hero-content">
                    <h1 className="armory-hero-title" data-text={armoryData.hero.title}>
                        {armoryData.hero.title}
                    </h1>
                    <p className="armory-hero-subtitle">{armoryData.hero.description}</p>
                </div>
                <div className="armory-overlay"></div>
            </section>

            <section className="armory-content container">
                <div className="armory-controls">
                    <div className="category-filters">
                        {armoryData.categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                    <div className="armory-search">
                        <FontAwesomeIcon icon={faSearch} />
                        <input type="text" placeholder="SEARCH DATABASE..." />
                    </div>
                </div>

                <div className="product-grid">
                    {filteredProducts.map(product => (
                        <div key={product.id} className={`product-card rarity-${product.rarity}`}>
                            <div className="product-image-container">
                                {/* Placeholder for now if image fails */}
                                <div className="img-placeholder" style={{ background: '#222' }}>
                                    {product.image && <img src={product.image} alt={product.name} />}
                                </div>
                                {product.tag && <span className="product-tag">{product.tag}</span>}
                                <div className="product-overlay">
                                    <MagneticButton className="quick-buy-btn">
                                        ADD TO CART
                                    </MagneticButton>
                                </div>
                            </div>
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <div className="product-meta">
                                    <span className="product-rarity">{product.rarity.toUpperCase()}</span>
                                    <span className="product-price">${product.price}</span>
                                </div>
                                <div className="product-stats">
                                    {Object.entries(product.stats).map(([key, value]) => (
                                        <div key={key} className="stat-item">
                                            <span className="stat-label">{key}</span>
                                            <span className="stat-val">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ArmoryPage;
