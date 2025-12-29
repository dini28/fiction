import { faTwitch, faDiscord, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faTrophy, faCalendarAlt, faUsers } from '@fortawesome/free-solid-svg-icons';

import parallax_1 from '../assets/images/backgrounds/parallax_1.jpg';
import parallax_2 from '../assets/images/backgrounds/parallax_2.jpg';
//import parallax_3 from '../assets/images/backgrounds/parallax_3.jpg';

export const eventsData = [
    {
        id: 1,
        title: "Valorant Champions 2025",
        date: "AUG 15 - 25",
        status: "Upcoming",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
        description: "The world's best teams clash for the ultimate title in Seoul."
    },
    {
        id: 2,
        title: "Community Gameday: CS2",
        date: "THIS SATURDAY",
        status: "Open",
        image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80",
        description: "Join our discord for 5v5 scrims. Prizes for MVP."
    },
    {
        id: 3,
        title: "Dev Stream: Patch 4.0",
        date: "JULY 10",
        status: "Live Soon",
        image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80",
        description: "Deep dive into the new agent mechanics and map rotation."
    }
];

export const communityData = {
    stats: [
        { label: "Active Members", value: "125K+", icon: faUsers },
        { label: "Daily Matches", value: "850+", icon: faTrophy },
        { label: "Online Now", value: "4.2K", icon: faDiscord }
    ],
    title: "Join the Squad",
    description: "Connect with players, find your duo, and participate in exclusive tournaments. The Fiction Games community is waiting for you.",
    links: [
        { label: "Join Discord", url: "#", icon: faDiscord, primary: true },
        { label: "Watch Stream", url: "#", icon: faTwitch },
        { label: "Youtube", url: "#", icon: faYoutube }
    ]
};

export const parallaxData = [
    {
        id: 1,
        image: parallax_1,
        title: "Immersive Worlds",
        subtitle: "Experience The Next Level"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1600&q=80",
        title: "Cyberpunk Future",
        subtitle: "Redefine Your Reality"
    },
    {
        id: 3,
        image: parallax_2,
        title: "Pro Hardware",
        subtitle: "Gear Up For Victory"
    }
];
