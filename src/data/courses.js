export const courses = [
    {
        id: 1,
        title: "1. Basic to Pro Forex Foundation",
        duration: "4h 30m",
        lessonsCount: 12,
        thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1000&auto=format&fit=crop",
        progress: 100,
        level: "Beginner",
        description: "In this comprehensive module, we cover the core concepts of market structure, identifying break of structure (BOS), and change of character (CHoCH). This is the foundation of our trading strategy. ",
        materials: [
            { id: 1, title: "Introduction", url: "/materials/introduction.pdf" },
            { id: 2, title: "How Much Can You Earn from Trading", url: "/materials/How Much Can You Earn from Trading.pdf" },
            { id: 3, title: "Course Design", url: "/materials/Course Design.pdf" }
        ],
        playlist: [
            { id: 1, title: "Introduction to Forex", duration: "10:05", videoId: "5iEHsRja8u0" },
            { id: 2, title: "Market Structure 101", duration: "15:30", videoId: "sZAE_lqdeno" },
            { id: 3, title: "Support & Resistance", duration: "12:45", videoId: "7KedELXv68I" },
            { id: 4, title: "Trendlines Mastery", duration: "20:15", videoId: "E3lYZsy8nYE" },
            { id: 5, title: "Candlestick Patterns", duration: "18:00", videoId: "bx4pIv4Wtck" },
        ]
    },
    {
        id: 2,
        title: "2. Technical Analysis Mastery",
        duration: "6h 15m",
        lessonsCount: 24,
        thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1000&auto=format&fit=crop",
        progress: 45,
        level: "Intermediate",
        description: "Master the art of technical analysis with advanced concepts including liquidity, order blocks, and inducement.",
        materials: [],
        playlist: [
            { id: 1, title: "Advanced Market Structure", duration: "25:00", videoId: "M7lc1UVf-VE" },
            { id: 2, title: "Liquidity Concepts", duration: "30:00", videoId: "M7lc1UVf-VE" },
            { id: 3, title: "Order Blocks Explained", duration: "22:15", videoId: "M7lc1UVf-VE" }
        ]
    },
    {
        id: 3,
        title: "3. My Personal Scalping Strategy",
        duration: "3h 45m",
        lessonsCount: 8,
        thumbnail: "https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?q=80&w=1000&auto=format&fit=crop",
        progress: 0,
        level: "Advanced",
        description: "Learn my personal high-win-rate scalping strategy that I use daily to extract profits from the markets.",
        materials: [],
        playlist: [
            { id: 1, title: "Strategy Overview", duration: "15:00", videoId: "M7lc1UVf-VE" },
            { id: 2, title: "Entry Criteria", duration: "20:00", videoId: "M7lc1UVf-VE" }
        ]
    },
    {
        id: 4,
        title: "4. Risk Management & Psychology",
        duration: "2h 20m",
        lessonsCount: 10,
        thumbnail: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=1000&auto=format&fit=crop",
        progress: 10,
        level: "Essential",
        description: "Trading is 80% psychology. Learn how to master your mind and protect your capital.",
        materials: [],
        playlist: [
            { id: 1, title: "The Probability Mindset", duration: "18:00", videoId: "M7lc1UVf-VE" },
            { id: 2, title: "Risk Management Math", duration: "22:00", videoId: "M7lc1UVf-VE" }
        ]
    }
];
