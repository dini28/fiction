import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { formatPrice } from '../../../utils/formatPrice';
import { MAX_QUANTITY_PER_ITEM } from '../../cart/cartPricing';

const getButtonLabel = (quantityInCart) => {
    if (quantityInCart >= MAX_QUANTITY_PER_ITEM) return 'Limit reached';
    if (quantityInCart > 0) return `Add another (${quantityInCart} in cart)`;
    return 'Add to cart';
};

const FeaturedDrop = ({ product, quantityInCart, onAdd }) => (
    <section className="featured-drop" aria-labelledby="featured-drop-title">
        <div className="featured-media">
            <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
            {product.tag && <span className="product-tag">{product.tag}</span>}
        </div>

        <div className="featured-copy">
            <span className="armory-eyebrow">Featured drop</span>
            <h2 id="featured-drop-title" className="featured-title">{product.name}</h2>
            <p className="featured-desc">{product.description}</p>

            {product.includes && (
                <ul className="featured-includes">
                    {product.includes.map((item) => (
                        <li key={item}>
                            <FontAwesomeIcon icon={faCheck} className="featured-check" />
                            {item}
                        </li>
                    ))}
                </ul>
            )}

            <div className="featured-actions">
                <span className="featured-price">{formatPrice(product.price)}</span>
                <button
                    type="button"
                    className="armory-btn-primary"
                    onClick={() => onAdd(product)}
                    disabled={quantityInCart >= MAX_QUANTITY_PER_ITEM}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    {getButtonLabel(quantityInCart)}
                </button>
            </div>
            <p className="featured-note">Limited to 2,500 numbered units. Ships within 5 business days.</p>
        </div>
    </section>
);

export default FeaturedDrop;
