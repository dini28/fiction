import Mouse from '../assets/images/Armory/Mouse.png';
import RainJacket from '../assets/images/Armory/RainJacket.png';
import Jacket from '../assets/images/Armory/Jacket.png';
import BomberJacket from '../assets/images/Armory/BomberJacket.png';
import Hoddie from '../assets/images/Armory/Hoddie.png';
import Keyboard from '../assets/images/Armory/Keyboard.png';
import Pants from '../assets/images/Armory/Pants.png';
import Chair from '../assets/images/Armory/Chair.png';
import Pendant from '../assets/images/Armory/Pendant.png';
import Hat from '../assets/images/Armory/Hat.png';
import Beanie from '../assets/images/Armory/Beanie.png'
import City from '../assets/images/Armory/City.png'
import Poster from '../assets/images/Armory/Poster.png'

export const armoryData = {
    hero: {
        title: "THE ARMORY",
        subtitle: "OFFICIAL GEAR",
        description: "Equip yourself with elite-grade apparel, collectibles, and peripherals. Verify your allegiance.",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
    },
    categories: [
        { id: 'all', label: 'SHOP ALL' },
        { id: 'apparel', label: 'APPAREL', subcategories: ['hoodies-jackets', 'loungewear', 'hats-beanies', 'jewelry'] },
        { id: 'collectibles', label: 'COLLECTIBLES', subcategories: ['figures', 'collectors-editions'] },
        { id: 'hardware', label: 'HARDWARE', subcategories: ['gaming-chair', 'keyboard', 'mouse'] },
        { id: 'art', label: 'ART', subcategories: ['art-prints', 'posters'] }
    ],
    products: [
        // APPAREL
        {
            id: 'a1',
            name: "JACKET",
            price: 149.99,
            category: 'apparel',
            subcategory: 'hoodies-jackets',
            rarity: 'legendary',
            image: Jacket,
            stats: { material: "COTTON BLEND", warmth: "HIGH", style: "STRETCH" },
            tag: "LIMITED"
        },
        {
            id: 'a2',
            name: "GAMER HOODIE",
            price: 89.99,
            category: 'apparel',
            subcategory: 'hoodies-jackets',
            rarity: 'rare',
            image: Hoddie,
            stats: { material: "COTTON BLEND", fit: "OVERSIZED", warmth: "HIGH" }
        },
        {
            id: 'a3',
            name: "RAIN JACKET",
            price: 119.99,
            category: 'apparel',
            subcategory: 'jewelry',
            rarity: 'epic',
            image: RainJacket,
            stats: { material: "POLYSTER", weight: "LIGHT", chain: "24 INCH" }
        },
        {
            id: 'a4',
            name: "BOMBER JACKET",
            price: 149.99,
            category: 'apparel',
            subcategory: 'hoodies-jackets',
            rarity: 'legendary',
            image: BomberJacket,
            stats: { material: "NANO-FIBER", warmth: "HIGH", style: "STRETCH" },
            tag: "LIMITED"
        },
        {
            id: 'a6',
            name: "VOID PANTS",
            price: 64.99,
            category: 'apparel',
            subcategory: 'loungewear',
            rarity: 'common',
            image: Pants,
            stats: { material: "SOFT-TOUCH", comfort: "MAX", style: "JOGGER" }
        },
        {
            id: 'a5',
            name: "GAMER BEANIE",
            price: 29.99,
            category: 'apparel',
            subcategory: 'hats-beanies',
            rarity: 'common',
            image: Beanie,
            stats: { warmth: "MID", size: "ONE-SIZE", logo: "EMBROIDERED" }
        },
        {
            id: 'a7',
            name: "GAMER HAT",
            price: 29.99,
            category: 'apparel',
            subcategory: 'hats-beanies',
            rarity: 'common',
            image: Hat,
            stats: { warmth: "MID", size: "ONE-SIZE", logo: "EMBROIDERED" }
        },
        {
            id: 'a8',
            name: "GAMER PENDANT",
            price: 119.99,
            category: 'apparel',
            subcategory: 'jewelry',
            rarity: 'epic',
            image: Pendant,
            stats: { material: "STERLING SILVER", weight: "LIGHT", chain: "24 INCH" }
        },

        // COLLECTIBLES
        {
            id: 'c1',
            name: "SENIN RONIN 1:6 SCALE",
            price: 299.99,
            category: 'collectibles',
            subcategory: 'figures',
            rarity: 'legendary',
            image: "https://plus.unsplash.com/premium_photo-1673895207787-8aa5237c15eb?q=80&w=2070&auto=format&fit=crop",
            stats: { height: "12 INCH", articulation: "30 PTS", accessories: "8" },
            tag: "LIMITED RUN"
        },
        {
            id: 'c2',
            name: "FICTION: ORIGINS - COLLECTOR'S ED.",
            price: 199.99,
            category: 'collectibles',
            subcategory: 'collectors-editions',
            rarity: 'mythic',
            image: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=2000&auto=format&fit=crop",
            stats: { content: "GAME + OST", extras: "STATUE", packaging: "STEELBOOK" }
        },

        // HARDWARE
        {
            id: 'h1',
            name: "THRONE OMEGA CHAIR",
            price: 499.99,
            category: 'hardware',
            subcategory: 'gaming-chair',
            rarity: 'epic',
            image: Chair,
            stats: { material: "PU LEATHER", recline: "180 DEG", support: "4D ARMRESTS" }
        },
        {
            id: 'h2',
            name: "MECHANIKA 60% KEYBOARD",
            price: 159.99,
            category: 'hardware',
            subcategory: 'keyboard',
            rarity: 'rare',
            image: Keyboard,
            stats: { switches: "RED LINEAR", connection: "WIRELESS", rgb: "PER-KEY" }
        },
        {
            id: 'h3',
            name: "PRECISION V4 MOUSE",
            price: 79.99,
            category: 'hardware',
            subcategory: 'mouse',
            rarity: 'common',
            image: Mouse,
            stats: { dpi: "20K", weight: "62G", buttons: "6 PROG" }
        },

        // ART
        {
            id: 'ar1',
            name: "NEON CITYSCAPE PRINT",
            price: 45.00,
            category: 'art',
            subcategory: 'art-prints',
            rarity: 'common',
            image: City,
            stats: { size: "24x36", paper: "ARCHIVAL", finish: "MATTE" }
        },
        {
            id: 'ar2',
            name: "CYBER WARRIOR POSTER",
            price: 25.00,
            category: 'art',
            subcategory: 'posters',
            rarity: 'common',
            image: Poster,
            stats: { size: "18x24", paper: "GLOSS", series: "WAVE 1" }
        }
    ]
};

