import GamingNewsMain from '../assets/images/GamingNews/GamingNewsMain.jpg'
import GamingShift from '../assets/images/GamingNews/GravityShift.jpg'
import CrystalKeepers from '../assets/images/GamingNews/CrystalKeepers.jpg'
import WarZone from '../assets/images/GamingNews/WarZone.png'
import ShadowSector from '../assets/images/GamingNews/ShadowSector.png'

export const newsData = {
    featured: {
        id: 'featured-warzone',
        image: GamingNewsMain,
        title: 'Operation: Dark Winter',
        subtitle: 'Official Gameplay Launch Trailer',
        badge: 'Live Now',
        badgeType: 'critical'
    },
    sidebar: [
        {
            id: 'news-1',
            title: 'EARN YOUR LEGACY | Worlds 2025',
            badge: 'News',
            badgeType: 'lol',
            // Esports arena stage
            image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
            alt: 'Worlds 2025'
        },
        {
            id: 'news-2',
            title: 'GIVE THEM NOTHING // Veto Agent Trailer',
            badge: 'News',
            badgeType: 'default',
            // Cyberpunk character concept
            image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80',
            alt: 'Valorant'
        },
        {
            id: 'news-3',
            title: 'Final Contact - The Path to Paris',
            badge: 'News',
            badgeType: 'default',
            // Stadium crowd/lights
            image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
            alt: 'Esports'
        },
        {
            id: 'news-4',
            title: 'Worlds 2025 Primer',
            badge: 'News',
            badgeType: 'lol',
            // Trophy or championship vibe
            image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80',
            alt: 'Championship'
        }
    ]
};

export const gamesData = {
    mainGames: [
        {
            id: 'nebula-1',
            name: 'Neon Protocol',
            image: '/images/neon-protocol.jpg',
            platforms: ['desktop', 'playstation', 'xbox'],
            size: 'default',
            genre: 'Cyberpunk RPG'
        },
        {
            id: 'nebula-2',
            name: 'Void Runner',
            image: '/images/void-runner.jpg',
            platforms: ['desktop', 'mobile-alt'],
            size: 'default',
            genre: 'Infinite Flyer'
        }
    ],
    midGames: [
        {
            id: 'nebula-3',
            name: 'Star\nTactics',
            image: 'https://images.unsplash.com/photo-1614728263952-84ea206f25ab?w=600&h=400&fit=crop&q=80',
            platforms: ['desktop', 'apple'],
            size: 'small',
            genre: 'Turn-based Strategy'
        },
        {
            id: 'nebula-4',
            name: 'Gravity\nShift',
            image: GamingShift,
            platforms: ['mobile-alt'],
            size: 'small',
            genre: 'Puzzle Platformer'
        },
        {
            id: 'nebula-5',
            name: 'Crystal\nKeepers',
            image: CrystalKeepers,
            platforms: ['desktop', 'apple', 'mobile-alt'],
            size: 'small',
            genre: 'Battle Royale'
        }
    ],
    comingSoon: [
        {
            id: 'nebula-6',
            name: '',
            image: WarZone,
            platforms: ['desktop', 'playstation', 'xbox'],
            size: 'default',
            comingSoon: true,
            releaseDate: 'Q4 2026'
        },
        {
            id: 'nebula-7',
            name: '',
            image: ShadowSector,
            platforms: ['desktop'],
            size: 'small',
            comingSoon: true,
            releaseDate: 'TBA'
        }
    ]
};
