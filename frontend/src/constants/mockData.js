export const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Air Jordan 1 'Lost & Found'",
    brand: "Jordan",
    price: 450,
    lastSale: 420,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviews: 128,
    marketIndex: [400, 415, 390, 430, 450, 445, 460],
    sentiment: 82,
    sellers: [
      { id: 's1', name: "SoleReserve", price: 450, delivery: "2-3 days", condition: "New", trust: 99 },
      { id: 's2', name: "KickNexus", price: 435, delivery: "5 days", condition: "New (No Box)", trust: 94 },
      { id: 's3', name: "HypeVault", price: 465, delivery: "Next Day", condition: "New", trust: 100 }
    ],
    outfit: [
      { name: "Aura Essentials Hoodie", price: 85, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=200" },
      { name: "Tech Cargo Pants", price: 120, img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=200" }
    ]
  },
  {
    id: 2,
    name: "Yeezy Boost 350 V2 'Slate'",
    brand: "Adidas",
    price: 280,
    lastSale: 310,
    image: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    reviews: 85,
    marketIndex: [320, 310, 305, 290, 280, 275, 280],
    sentiment: 45,
    sellers: [
      { id: 's4', name: "YeezySupply", price: 280, delivery: "3 days", condition: "New", trust: 98 },
      { id: 's5', name: "GrailSpot", price: 275, delivery: "4 days", condition: "Pre-owned", trust: 92 }
    ],
    outfit: [
      { name: "Oversized Sand Tee", price: 45, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=200" }
    ]
  },
  {
    id: 3,
    name: "Nike Dunk Low 'Panda'",
    brand: "Nike",
    price: 180,
    lastSale: 175,
    image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=800",
    rating: 4.5,
    reviews: 342,
    marketIndex: [160, 165, 170, 175, 180, 185, 180],
    sentiment: 95,
    sellers: [
      { id: 's6', name: "RetailDirect", price: 180, delivery: "2 days", condition: "New", trust: 100 }
    ],
    outfit: []
  }
];