import './UpcomingEvents.css';
import { eventsData } from '../../../data/homeSectionsData';
import SectionHeader from '../../common/SectionHeader';

const UpcomingEvents = () => {
    return (
        <section className="events-section">
            <div className="container">
                <SectionHeader title="Incoming Transmissions" />

                <div className="events-scroll-container">
                    {eventsData.map((event) => (
                        <div key={event.id} className="event-card">
                            <div className="event-image-wrapper">
                                <span className="event-status">{event.status}</span>
                                <img src={event.image} alt={event.title} className="event-image" />
                            </div>
                            <div className="event-content">
                                <span className="event-date">{event.date}</span>
                                <h3 className="event-title">{event.title}</h3>
                                <p className="event-desc">{event.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UpcomingEvents;
