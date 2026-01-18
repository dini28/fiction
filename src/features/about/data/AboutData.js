import director from '../../../assets/images/team/director.png'
import art from '../../../assets/images/team/art.png'
import audio from '../../../assets/images/team/audio.png'
import developer from '../../../assets/images/team/developer.png'

const AboutData = {
    timelineData: [
        { year: "2021", event: "Protocol Initialized. Core team assembled in Tokyo." },
        { year: "2023", event: "Series A Funding Secured. 'Project: Fiction' enters alpha." },
        { year: "2025", event: "Global Beta Launch. 1M+ active operatives." },
        { year: "2026", event: "Expansion to Sector 7. New IPs in development." }
    ],

    teamData: [
        { name: "Arjun Mehta", role: "Director", avatar: director },
        { name: "Maya Collins", role: "Lead Audio", avatar: audio },
        { name: "Lucas Reinhardt", role: "Art Lead", avatar: art },
        { name: "Ethan Brooks", role: "Lead Developer", avatar: developer }
    ],

    statsData: [
        { label: "Operatives", value: "1,200,000+" },
        { label: "Regions", value: "4" },
        { label: "Uptime", value: "99.9%" }
    ]
}

export default AboutData