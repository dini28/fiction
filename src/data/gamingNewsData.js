import image from '../assets/images/image.png'
import GamingShift from '../assets/images/games/GravityShift.webp'
import AbstractStrategy from '../assets/images/games/AbstractStrategy.webp'
import WarZone from '../assets/images/games/WarZone.png'
import ShadowSector from '../assets/images/games/ShadowSector.png'
import Obsidian from '../assets/images/games/Obsidian.webp'
import StarTactics from '../assets/images/games/StarTactics.webp'

import agent from '../assets/images/agent.jpg'
import news_1 from '../assets/images/news/news_1.png'
import news_2 from '../assets/images/news/news_2.jpg'

export const newsData = {
    featured: {
        id: 'featured-ironfall',
        image: image,
        title: 'Operation: Ironfall',
        subtitle: 'Cinematic Gameplay Reveal',
        badge: 'Live Now',
        badgeType: 'critical'
    },
    sidebar: [
        {
            id: 'news-1',
            title: 'CLAIM THE CROWN | Ascension League',
            badge: 'News',
            badgeType: 'elite',
            image: news_1,
            alt: 'Ascension League Arena'
        },
        {
            id: 'news-2',
            title: 'LEAVE NO TRACE || Phantom Unit Trailer',
            badge: 'News',
            badgeType: 'default',
            image: news_2,
            alt: 'Sci-Fi Operative'
        },
        {
            id: 'news-3',
            title: 'Final Signal — Road to Obsidian City',
            badge: 'News',
            badgeType: 'default',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
            alt: 'Futuristic Arena'
        },
        {
            id: 'news-4',
            title: 'Ascension League: Season Zero Briefing',
            badge: 'News',
            badgeType: 'elite',
            image: agent,
            alt: 'Championship Relic'
        }
    ]
};

export const gamesData = {
    mainGames: [
        {
            id: 'nebula-1',
            name: 'Obsidian Edge',
            image: Obsidian,
            platforms: ['desktop', 'mobile-alt'],
            size: 'default',
            genre: 'Dark Action RPG'
        }
    ],
    midGames: [
        {
            id: 'nebula-2',
            name: 'Star\nTactics',
            image: StarTactics,
            platforms: ['desktop', 'apple'],
            size: 'small',
            genre: 'Turn-based Strategy'
        },
        {
            id: 'nebula-3',
            name: 'Gravity\nShift',
            image: GamingShift,
            platforms: ['mobile-alt'],
            size: 'small',
            genre: 'Puzzle Platformer'
        },
        {
            id: 'nebula-4',
            name: 'Abstract\nStrategy',
            image: AbstractStrategy,
            platforms: ['desktop', 'apple', 'mobile-alt'],
            size: 'small',
            genre: 'Battle Royale'
        }
    ],
    comingSoon: [
        {
            id: 'nebula-5',
            name: '',
            image: WarZone,
            platforms: ['desktop', 'playstation', 'xbox'],
            size: 'default',
            comingSoon: true,
            releaseDate: 'Q4 2026'
        },
        {
            id: 'nebula-6',
            name: '',
            image: ShadowSector,
            platforms: ['desktop'],
            size: 'small',
            comingSoon: true,
            releaseDate: 'TBA'
        }
    ]
};
