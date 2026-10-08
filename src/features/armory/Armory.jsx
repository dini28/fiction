import { useState, useRef, useMemo, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Armory.css';
import { armoryData, sortOptions, perks } from './data/ArmoryData';
import PageHero from '../../components/ui/PageHero/PageHero';
import ProductCard from './components/ProductCard';
import FeaturedDrop from './components/FeaturedDrop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faXmark,
    faBagShopping,
    faTruckFast,
    faRotateLeft,
    faLock,
    faBolt
} from '@fortawesome/free-solid-svg-icons';
import ArmoryHero from '../../assets/images/backgrounds/ArmoryHero.jpg';

const perkIcons = {
    shipping: faTruckFast,
    returns: faRotateLeft,
    secure: faLock,
    drops: faBolt
};

const subcategoryLabels = Object.fromEntries(
    armoryData.categories.flatMap(cat => (cat.subcategories || []).map(sub => [sub.id, sub.label]))
);

const categoryCounts = armoryData.products.reduce(
    (counts, p) => ({ ...counts, [p.category]: (counts[p.category] || 0) + 1 }),
    { all: armoryData.products.length }
);

const featuredProduct = armoryData.products.find(p => p.featured);

const sorters = {
    featured: () => 0,
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    name: (a, b) => a.name.localeCompare(b.name)
};

const Armory = () => {
    const { cart, addToCart, openCart, cartCount } = useCart();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('featured');
    const pageRef = useRef(null);
    const shopRef = useRef(null);
    const productGridRef = useRef(null);

    const currentCategoryData = armoryData.categories.find(c => c.id === searchParams.get('category'))
        ?? armoryData.categories[0];
    const activeCategory = currentCategoryData.id;
    const activeSubcategory = currentCategoryData.subcategories?.find(s => s.id === searchParams.get('type'))?.id
        ?? 'all';

    const setFilters = (category, subcategory) => {
        const params = new URLSearchParams();
        if (category !== 'all') params.set('category', category);
        if (subcategory !== 'all') params.set('type', subcategory);
        setSearchParams(params, { replace: true });
    };

    useEffect(() => {
        if (location.state?.scrollTo !== 'shop') return;
        shopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [location.key, location.state]);

    const normalizedQuery = searchQuery.trim().toLowerCase();
    const hasActiveFilters = activeCategory !== 'all' || normalizedQuery !== '' || sortBy !== 'featured';

    const filteredProducts = armoryData.products
        .filter(p => {
            if (normalizedQuery && !p.name.toLowerCase().includes(normalizedQuery)) return false;
            if (activeCategory === 'all') return true;
            if (p.category !== activeCategory) return false;
            if (activeSubcategory === 'all') return true;
            return p.subcategory === activeSubcategory;
        })
        .sort(sorters[sortBy]);

    const cartQuantities = useMemo(
        () => Object.fromEntries(cart.map(item => [item.id, item.quantity])),
        [cart]
    );

    const handleCategoryChange = (categoryId) => setFilters(categoryId, 'all');

    const clearFilters = () => {
        setFilters('all', 'all');
        setSearchQuery('');
        setSortBy('featured');
    };

    useGSAP(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        gsap.from('.armory-reveal', {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: { trigger: '.armory-perks', start: 'top 85%' }
        });
    }, { scope: pageRef });

    useGSAP(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        gsap.fromTo('.product-card',
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, stagger: 0.04, ease: 'power2.out', overwrite: true }
        );
    }, { scope: productGridRef, dependencies: [activeCategory, activeSubcategory, normalizedQuery, sortBy] });

    return (
        <div className="page-wrapper armory-page" ref={pageRef}>
            <PageHero
                title="ARMORY"
                subtitle="OFFICIAL GEAR"
                description="Apparel, collectibles, and hardware designed with the teams behind our worlds."
                backgroundImage={ArmoryHero}
                alignment="center"
                compact
            />

            <section className="armory-perks" aria-label="Store benefits">
                <ul className="armory-container armory-perks-list">
                    {perks.map(perk => (
                        <li key={perk.id} className="armory-perk armory-reveal">
                            <span className="armory-perk-icon" aria-hidden="true">
                                <FontAwesomeIcon icon={perkIcons[perk.id]} />
                            </span>
                            <span>
                                <strong>{perk.title}</strong>
                                <span>{perk.text}</span>
                            </span>
                        </li>
                    ))}
                </ul>
            </section>

            {featuredProduct && (
                <div className="armory-container armory-reveal">
                    <FeaturedDrop
                        product={featuredProduct}
                        quantityInCart={cartQuantities[featuredProduct.id] || 0}
                        onAdd={addToCart}
                    />
                </div>
            )}

            <section ref={shopRef} className="armory-shop armory-container" aria-labelledby="armory-shop-title">
                <header className="armory-shop-header">
                    <div>
                        <span className="armory-eyebrow">Catalog</span>
                        <h2 id="armory-shop-title" className="armory-section-title">
                            {currentCategoryData?.label ?? 'All gear'}
                        </h2>
                    </div>
                </header>

                <div className="armory-toolbar">
                    <div className="armory-tabs" role="group" aria-label="Filter by category">
                        {armoryData.categories.map(cat => (
                            <button
                                key={cat.id}
                                type="button"
                                className={`armory-tab ${activeCategory === cat.id ? 'is-active' : ''}`}
                                aria-pressed={activeCategory === cat.id}
                                onClick={() => handleCategoryChange(cat.id)}
                            >
                                {cat.label}
                                <span className="armory-tab-count">{categoryCounts[cat.id] ?? 0}</span>
                            </button>
                        ))}
                    </div>

                    <div className="armory-toolbar-actions">
                        <label className="armory-search">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="armory-search-icon" />
                            <input
                                type="search"
                                placeholder="Search gear"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Search products"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    className="armory-search-clear"
                                    onClick={() => setSearchQuery('')}
                                    aria-label="Clear search"
                                >
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            )}
                        </label>

                        <label className="armory-sort">
                            <span className="visually-hidden">Sort products</span>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                {sortOptions.map(opt => (
                                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>

                {currentCategoryData?.subcategories && (
                    <div className="armory-chips" role="group" aria-label="Filter by type">
                        {[{ id: 'all', label: 'View all' }, ...currentCategoryData.subcategories].map(sub => (
                            <button
                                key={sub.id}
                                type="button"
                                className={`armory-chip ${activeSubcategory === sub.id ? 'is-active' : ''}`}
                                aria-pressed={activeSubcategory === sub.id}
                                onClick={() => setFilters(activeCategory, sub.id)}
                            >
                                {sub.label}
                            </button>
                        ))}
                    </div>
                )}

                <div className="armory-results-bar">
                    <p aria-live="polite">
                        Showing <strong>{filteredProducts.length}</strong> of {armoryData.products.length} items
                    </p>
                    {hasActiveFilters && (
                        <button type="button" className="armory-link-btn" onClick={clearFilters}>
                            Reset filters
                        </button>
                    )}
                </div>

                <div className="product-grid" ref={productGridRef}>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                subcategoryLabel={subcategoryLabels[product.subcategory]}
                                quantityInCart={cartQuantities[product.id] || 0}
                                onAdd={addToCart}
                            />
                        ))
                    ) : (
                        <div className="armory-empty">
                            <h3>No gear matches your filters</h3>
                            <p>Try a different search term or browse all categories.</p>
                            <button type="button" className="armory-btn-secondary" onClick={clearFilters}>
                                Reset filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <button type="button" className="armory-cart-float" onClick={openCart} aria-label={`Open cart, ${cartCount} items`}>
                <FontAwesomeIcon icon={faBagShopping} />
                <span className="armory-cart-label">Cart</span>
                <span className="armory-cart-count">{cartCount}</span>
            </button>
        </div>
    );
};

export default Armory;
