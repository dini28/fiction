import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { rarityLabels } from '../data/ArmoryData';
import { formatPrice } from '../../../utils/formatPrice';
import { MAX_QUANTITY_PER_ITEM } from '../../cart/cartPricing';

const ProductCard = ({ product, subcategoryLabel, quantityInCart, onAdd }) => {
    const isAtLimit = quantityInCart >= MAX_QUANTITY_PER_ITEM;

    return (
        <article className={`product-card rarity-${product.rarity}`}>
            <div className="product-media">
                <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
                {product.tag && <span className="product-tag">{product.tag}</span>}
                {quantityInCart > 0 && (
                    <span className="product-in-cart">In cart · {quantityInCart}</span>
                )}
            </div>

            <div className="product-body">
                <div className="product-meta">
                    <span className="product-category">{subcategoryLabel}</span>
                    <span className="product-rarity">
                        <span className="rarity-dot" aria-hidden="true" />
                        {rarityLabels[product.rarity]}
                    </span>
                </div>

                <h3 className="product-name">{product.name}</h3>

                <dl className="product-specs">
                    {Object.entries(product.stats).map(([key, value]) => (
                        <div key={key} className="product-spec">
                            <dt>{key.replace('_', ' ')}</dt>
                            <dd>{value}</dd>
                        </div>
                    ))}
                </dl>

                <div className="product-footer">
                    <span className="product-price">{formatPrice(product.price)}</span>
                    <button
                        type="button"
                        className="add-to-cart-btn"
                        onClick={() => onAdd(product)}
                        disabled={isAtLimit}
                        aria-label={isAtLimit ? `${product.name}: order limit reached` : `Add ${product.name} to cart`}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        {isAtLimit ? 'Limit reached' : 'Add to cart'}
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
