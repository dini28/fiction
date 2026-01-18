import { faGlobe, faChartLine, faHeartPulse, faGamepad, faFileShield, faUserAstronaut, faMicrochip, faCrown } from '@fortawesome/free-solid-svg-icons';

const CareersData = {
    benefits: [
        {
            icon: faGlobe,
            title: "Global Freedom",
            desc: "Work from anywhere. We value output, not desk time."
        },
        {
            icon: faChartLine,
            title: "Uncapped Growth",
            desc: "Profit sharing and equity for every full-time operative."
        },
        {
            icon: faHeartPulse,
            title: "Health Protocol",
            desc: "Comprehensive coverage for you and your dependents."
        },
        {
            icon: faGamepad,
            title: "Level Up",
            desc: "$5k annual stipend for hardware, games, and learning."
        }
    ],

    process: [
        {
            step: "01",
            icon: faFileShield,
            title: "Intel Scan",
            desc: "Application review"
        },
        {
            step: "02",
            icon: faUserAstronaut,
            title: "Sync",
            desc: "Initial culture interview"
        },
        {
            step: "03",
            icon: faMicrochip,
            title: "Ops Check",
            desc: "Technical skill assessment"
        },
        {
            step: "04",
            icon: faCrown,
            title: "Final Boss",
            desc: "Founders interview"
        }
    ],

    careerOpportunities: [
        {
            id: 1,
            title: "Senior Gameplay Engineer",
            dept: "Engineering",
            loc: "Remote / Tokyo",
            type: "Full-time",
            status: "Hot",
            description: "We are looking for a Senior Gameplay Engineer to build the core mechanics of our next-generation tactical shooter. You will work closely with designers to implement responsive, feeling-first gameplay systems.",
            requirements: [
                "5+ years of C++ experience in AAA game development",
                "Strong math skills (3D vector math, linear algebra)",
                "Experience with Unreal Engine 5 source code",
                "Shipped at least one multiplayer title"
            ],
            responsibilities: [
                "Architect and implement core gameplay systems (movement, shooting, abilities)",
                "Optimize networking for high-performance competitive play",
                "Mentor junior engineers and conduct code reviews"
            ]
        },
        {
            id: 2,
            title: "VFX Artist",
            dept: "Art",
            loc: "Tokyo",
            type: "Full-time",
            status: "New",
            description: "Join our VFX team to create stunning, readable, and performant visual effects that define the look of our universe. From subtle environmental ambience to explosive ability effects, your work will be front and center.",
            requirements: [
                "Proficiency in Niagara (UE5) and Houdini",
                "Strong understanding of timing, color, and composition",
                "Experience with shader development (HLSL / Node-based)",
                "Portfolio demonstrating stylized and realistic effects"
            ],
            responsibilities: [
                "Create real-time visual effects for characters, environments, and UI",
                "Collaborate with Art Direction to establish visual language",
                "Optimize effects for target frame rates"
            ]
        },
        {
            id: 3,
            title: "Community Manager",
            dept: "Publishing",
            loc: "Remote",
            type: "Contract",
            status: null,
            description: "We need a voice for our operatives. As Community Manager, you will be the bridge between the development team and our player base, managing communication channels and fostering a healthy community.",
            requirements: [
                "3+ years experience in community management for gaming",
                "Excellent written communication skills",
                "Experience with Discord, Reddit, and social media management tools",
                "Passion for competitive shooters"
            ],
            responsibilities: [
                "Develop and execute community engagement strategies",
                "Monitor sentiment and report feedback to developers",
                "Organize community events and tournaments"
            ]
        },
        {
            id: 4,
            title: "UI/UX Designer",
            dept: "Design",
            loc: "Remote",
            type: "Full-time",
            status: null,
            description: "Design the interface of the future. We are looking for a UI/UX Designer to create intuitive and immersive interfaces that blend seamlessly with the game world.",
            requirements: [
                "Strong portfolio of game UI or futuristic app design",
                "Proficiency in Figma and Adobe Creative Suite",
                "Basic understanding of implementation in game engines",
                "Interest in diegetic and spatial UI design"
            ],
            responsibilities: [
                "Create user flows, wireframes, and high-fidelity mockups",
                "Design HUD elements, menus, and in-game displays",
                "Collaborate with engineers to ensure pixel-perfect implementation"
            ]
        }
    ]
}

export default CareersData;