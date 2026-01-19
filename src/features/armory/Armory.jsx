import { useState, useRef, lazy, Suspense } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Armory.css';
import { armoryData } from './data/ArmoryData';
import GlobalNoise from '../../components/ui/GlobalNoise/GlobalNoise';
import MagneticButton from '../../components/ui/MagneticButton/MagneticButton';
import PageHero from '../../components/ui/PageHero/PageHero';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import ArmoryHero from '../../assets/images/backgrounds/ArmoryHero.jpg';

const MorphSVGSection = lazy(() => import('../animation-showcase/MorphSVGSection'));

const Armory = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeSubcategory, setActiveSubcategory] = useState('all');
    const containerRef = useRef(null);
    const productGridRef = useRef(null);

    const filteredProducts = armoryData.products.filter(p => {
        if (activeCategory === 'all') return true;
        if (p.category !== activeCategory) return false;
        if (activeSubcategory === 'all') return true;
        return p.subcategory === activeSubcategory;
    });

    useGSAP(() => {
        // Animate products when filter changes
        gsap.fromTo(".product-card",
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.4,
                stagger: 0.05,
                ease: "power2.out",
                overwrite: true
            }
        );
    }, { scope: productGridRef, dependencies: [filteredProducts] });

    const currentCategoryData = armoryData.categories.find(c => c.id === activeCategory);

    return (
        <div className="page-wrapper armory-page" ref={containerRef}>
            <GlobalNoise />

            <PageHero
                title="ARMORY"
                subtitle="OFFICIAL GEAR"
                description="Equip yourself with elite-grade apparel, collectibles, and peripherals. Verify your allegiance."
                backgroundImage={ArmoryHero}
                alignment="center"
            />

            <Suspense fallback={<div style={{ height: '80vh', background: '#080808' }} />}>
                <MorphSVGSection />
            </Suspense>

            <section className="armory-content container">
                <div className="armory-controls">
                    <div className="filter-section">
                        <div className="main-filters">
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

                        {currentCategoryData && currentCategoryData.subcategories && (
                            <div className="sub-filters">
                                <button
                                    className={`sub-filter-btn ${activeSubcategory === 'all' ? 'active' : ''}`}
                                    onClick={() => setActiveSubcategory('all')}
                                >
                                    VIEW ALL
                                </button>
                                {currentCategoryData.subcategories.map(sub => (
                                    <button
                                        key={sub}
                                        className={`sub-filter-btn ${activeSubcategory === sub ? 'active' : ''}`}
                                        onClick={() => setActiveSubcategory(sub)}
                                    >
                                        {sub.replace('-', ' & ').replace('-', ' ')}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="armory-search">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input type="text" placeholder="SEARCH DATABASE..." />
                        <FontAwesomeIcon icon={faFilter} className="filter-icon" />
                    </div>
                </div>

                <div className="product-grid" ref={productGridRef}>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <div key={product.id} className={`product-card rarity-${product.rarity}`}>
                                <div className="product-image-container">
                                    <div className="img-wrapper">
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
                                    <div className="product-header">
                                        <h3 className="product-name">{product.name}</h3>
                                        <span className="product-price">${product.price}</span>
                                    </div>
                                    <div className="product-rarity-bar" data-rarity={product.rarity}></div>
                                    <div className="product-stats">
                                        {Object.entries(product.stats).map(([key, value]) => (
                                            <div key={key} className="stat-item">
                                                <span className="stat-label">{key.replace('_', ' ')}</span>
                                                <span className="stat-val">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <h3>NO ASSETS FOUND</h3>
                            <p>Adjust your filters, Operative.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Armory;
