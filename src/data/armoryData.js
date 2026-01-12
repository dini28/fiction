
export const armoryData = {
    hero: {
        title: "THE ARMORY",
        subtitle: "OFFICIAL GEAR",
        description: "Equip yourself with elite-grade apparel and peripherals. Verify your allegiance."
    },
    categories: [
        { id: 'all', label: 'ALL GEAR' },
        { id: 'apparel', label: 'APPAREL' },
        { id: 'hardware', label: 'HARDWARE' },
        { id: 'collectibles', label: 'COLLECTIBLES' }
    ],
    products: [
        {
            id: 'p1',
            name: "T-400 TACTICAL JACKET",
            price: 129.99,
            category: 'apparel',
            rarity: 'legendary',
            image: "https://images.unsplash.com/photo-1551028919-383718603bd5?q=80&w=1000&auto=format&fit=crop",
            stats: { durability: 95, comfort: 80, stealth: 100 },
            tag: "LIMITED EDITION"
        },
        {
            id: 'p2',
            name: "NEXUS PRO KEYBOARD",
            price: 199.99,
            category: 'hardware',
            rarity: 'rare',
            image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop",
            stats: { response: "1ms", switch: "OPTICAL", layout: "65%" },
            tag: "RGB SYNC"
        },
        {
            id: 'p3',
            name: "AIM-BOT MOUSE",
            price: 89.99,
            category: 'hardware',
            rarity: 'common',
            image: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1000&auto=format&fit=crop",
            stats: { dpi: "26K", weight: "58g", sensor: "PRO-X" }
        },
        {
            id: 'p4',
            name: "PHANTOM OPERATOR FIGURE",
            price: 59.99,
            category: 'collectibles',
            rarity: 'legendary',
            image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?q=80&w=1000&auto=format&fit=crop",
            stats: { scale: "1:6", material: "PVC", articulation: "20pts" },
            tag: "PRE-ORDER"
        },
        {
            id: 'p5',
            name: "OFFICIAL TEAM JERSEY",
            price: 79.99,
            category: 'apparel',
            rarity: 'rare',
            image: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?q=80&w=1000&auto=format&fit=crop",
            stats: { material: "DRY-FIT", fit: "SLIM", season: "2026" }
        },
        {
            id: 'p6',
            name: "COMMS HEADSET V2",
            price: 149.99,
            category: 'hardware',
            rarity: 'common',
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop",
            stats: { audio: "7.1", mic: "CLEAR-CAST", wireless: "2.4GHz" }
        }
    ]
};
