import { faTwitch, faDiscord, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faTrophy, faUsers } from '@fortawesome/free-solid-svg-icons';

import parallax_1 from '../assets/images/backgrounds/parallax_1.webp';
import parallax_2 from '../assets/images/backgrounds/parallax_2.webp';
//import parallax_3 from '../assets/images/backgrounds/parallax_3.jpg';


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
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=80",
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
