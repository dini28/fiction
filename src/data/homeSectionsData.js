import { faTwitch, faDiscord, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faTrophy, faUsers } from '@fortawesome/free-solid-svg-icons';


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
