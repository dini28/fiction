import './Newsletter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Newsletter = () => {
    return (
        <section className="newsletter-section">
            <div className="newsletter-content">
                <FontAwesomeIcon icon={faEnvelope} className="newsletter-icon" />
                <h2 className="newsletter-title">Get The Drops</h2>
                <p className="newsletter-desc">Subscribe to our newsletter for exclusive in-game items, beta keys, and the latest esports news.</p>

                <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder='Enter your email'
                        className="newsletter-input"
                        required
                    />
                    <button type="submit" className="newsletter-btn">
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;
