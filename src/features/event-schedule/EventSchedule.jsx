import React from 'react';
import './EventSchedule.css';

const EventSchedule = () => {
    const events = [
        {
            id: 1,
            title: "NEON NIGHTS: RAID EVENT",
            date: "LIVE NOW",
            description: "Double XP and exclusive loot drops in the Neon District.",
            status: "live",
            time: "ENDS IN 24H"
        },
        {
            id: 2,
            title: "GLOBAL TOURNAMENT QUALIFIERS",
            date: "JAN 24",
            description: "Register your squad for the ultimate competitive showdown.",
            status: "upcoming",
            time: "18:00 UTC"
        },
        {
            id: 3,
            title: "SERVER MAINTENANCE v2.4",
            date: "JAN 28",
            description: "System upgrades and sector expansion.",
            status: "upcoming",
            time: "02:00 - 06:00 UTC"
        },
        {
            id: 4,
            title: "SEASON 4: THE UPRISING",
            date: "FEB 10",
            description: "New maps, new weapons, and a new threat emerges.",
            status: "upcoming",
            time: "COMING SOON"
        }
    ];

    return (
        <section className="event-schedule-section">
            <div className="event-schedule-container">
                <header className="section-header">
                    <h2 className="section-title">EVENT TIMELINE</h2>
                    <div className="section-decoration"></div>
                </header>

                <div className="events-list">
                    {events.map((event) => (
                        <div key={event.id} className={`event-card ${event.status}`}>
                            <div className="event-date-box">
                                <span className="event-date-val">{event.date}</span>
                            </div>

                            <div className="event-info">
                                <h3 className="event-title">{event.title}</h3>
                                <p className="event-desc">{event.description}</p>
                            </div>

                            <div className="event-status-box">
                                <span className="event-time">{event.time}</span>
                                <span className={`status-badge ${event.status}`}>
                                    {event.status === 'live' ? '● LIVE' : event.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventSchedule;
