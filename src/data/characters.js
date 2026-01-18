import { faJedi, faHurricane, faPersonRunning, faShieldHalved, faPersonRifle } from '@fortawesome/free-solid-svg-icons';
import StarTactics from '../assets/images/characters/StarTactics.png';
import ObsidianEdge from '../assets/images/characters/ObsidianEdge.png';
import GravityShift from '../assets/images/characters/GravityShift.png';
import ShadowSector from '../assets/images/characters/ShadowSector.png';
import TitanWake from '../assets/images/characters/TitanWake.png';

export const characters = [
    {
        id: 1,
        name: "George",
        title: "STAR TACTICS",
        role: "GUARDIAN",
        desc: "A legendary spacefarer who has traversed the cosmos, bringing back technology and hope from the furthest reaches of the galaxy.",
        icon: faJedi,
        image: StarTactics,
        color: "#e2e3dd"
    },
    {
        id: 2,
        name: "Liam",
        title: "OBSIDIAN EDGE",
        role: "ASSASSIN",
        desc: "A master of the blade living the assassin's creed, stalking high-value targets from the shadows of the neon city.",
        icon: faHurricane,
        image: ObsidianEdge,
        color: "#ff8c42"
    },
    {
        id: 3,
        name: "Noah",
        title: "Gravity Shift",
        role: "SPEEDSTER",
        desc: "A legendary runner who conquered the Labyrinth of Gold, outsmarting traps and rivals to claim the ultimate prize.",
        icon: faPersonRunning,
        image: GravityShift,
        color: "#e1c283"
    },
    {
        id: 4,
        name: "Elijah",
        title: "Shadow Sector",
        role: "WARRIOR",
        desc: "A timeless warrior who bridges eras, wielding ancient combat mastery enhanced by modern warfare technology.",
        icon: faShieldHalved,
        image: ShadowSector,
        color: "#83afb6"
    },
    {
        id: 5,
        name: "Alfred",
        title: "TITAN WAKE",
        role: "SOLDIER",
        desc: "The planet's staunchest defender, a soldier dedicated to holding the line against the catastrophic Titan threat.",
        icon: faPersonRifle,
        image: TitanWake,
        color: "#e6b582"
    }
];
