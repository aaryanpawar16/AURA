const products = [
  {
    id: 1,
    name: "Air Jordan 1 'Lost & Found'",
    brand: "Jordan",
    price: 450,
    lastSale: 420,
    image: "https://i.ytimg.com/vi/dntmuB6kw_A/maxresdefault.jpg",
    rating: 4.9,
    reviews: 128,
    marketIndex: [400, 415, 390, 430, 450, 445, 460],
    sentiment: 82,
    sellers: [
      { id: 's1', name: "SoleReserve", price: 450, delivery: "2-3 days", condition: "New", trust: 99 },
      { id: 's2', name: "KickNexus", price: 435, delivery: "5 days", condition: "New (No Box)", trust: 94 },
      { id: 's3', name: "HypeVault", price: 465, delivery: "Next Day", condition: "New", trust: 100 }
    ]
  },
  {
    id: 2,
    name: "Yeezy Boost 350 V2 'Slate'",
    brand: "Adidas",
    price: 280,
    lastSale: 310,
    image: "https://images.unsplash.com/photo-1551421184-c6be252c2b26?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9",
    rating: 4.7,
    reviews: 85,
    marketIndex: [320, 310, 305, 290, 280, 275, 280],
    sentiment: 45,
    sellers: [
      { id: 's4', name: "YeezySupply", price: 280, delivery: "3 days", condition: "New", trust: 98 },
      { id: 's5', name: "GrailSpot", price: 275, delivery: "4 days", condition: "Pre-owned", trust: 92 }
    ]
  },
  {
    id: 3,
    name: "Nike Dunk Low 'Panda'",
    brand: "Nike",
    price: 180,
    lastSale: 175,
    image: "https://cdn.eql.media/draw-api/5ac48506-a5f6-49a8-ac22-6632cf6166a7/6e54106a-facb-499e-88ce-b92a61b6b7e8",
    rating: 4.5,
    reviews: 342,
    marketIndex: [160, 165, 170, 175, 180, 185, 180],
    sentiment: 95,
    sellers: [
      { id: 's6', name: "RetailDirect", price: 180, delivery: "2 days", condition: "New", trust: 100 }
    ]
  },
  {
    id: 4,
    name: "New Balance 550 'White Green'",
    brand: "New Balance",
    price: 140,
    lastSale: 135,
    image: "https://sneakerbardetroit.com/wp-content/uploads/2024/04/New-Balance-550-Golf-White-Green-MG550WG-1068x748.jpg",
    rating: 4.6,
    reviews: 56,
    marketIndex: [150, 145, 140, 138, 140, 142, 145],
    sentiment: 78,
    sellers: [
      { id: 's7', name: "NB Vault", price: 140, delivery: "3-5 days", condition: "New", trust: 96 }
    ]
  },
  {
    id: 5,
    name: "Travis Scott x Air Jordan 1 Low 'Olive'",
    brand: "Jordan",
    price: 850,
    lastSale: 890,
    image: "https://images.augustman.com/wp-content/uploads/sites/2/2022/11/04162022/travis-scott-x-air-jordan-1-low-olive.jpeg",
    rating: 5.0,
    reviews: 210,
    marketIndex: [800, 820, 850, 900, 880, 850, 860],
    sentiment: 98,
    sellers: [
      { id: 's8', name: "CactusJackResell", price: 850, delivery: "Next Day", condition: "New", trust: 99 }
    ]
  },
  {
    id: 6,
    name: "Off-White x Nike Air Force 1 'Brooklyn'",
    brand: "Nike",
    price: 1400,
    lastSale: 1350,
    image: "https://tse2.mm.bing.net/th/id/OIP.L5HvQ1lXBG7u7Nj4Z0F_cwHaE3?pid=Api&P=0&h=220",
    rating: 4.8,
    reviews: 45,
    marketIndex: [1200, 1250, 1300, 1350, 1400, 1380, 1400],
    sentiment: 92,
    sellers: [
      { id: 's9', name: "VirgilForever", price: 1400, delivery: "2 days", condition: "New", trust: 100 }
    ]
  },
  {
    id: 7,
    name: "Supreme Box Logo Hoodie 'Grey'",
    brand: "Accessories",
    price: 400,
    lastSale: 380,
    image: "https://tse4.mm.bing.net/th/id/OIP.pRUEWlpiv19qblisvDyNLQHaHa?pid=Api&P=0&h=220",
    rating: 4.7,
    reviews: 320,
    marketIndex: [350, 360, 370, 380, 400, 395, 400],
    sentiment: 88,
    sellers: [
      { id: 's10', name: "StreetwearKing", price: 400, delivery: "4 days", condition: "New", trust: 97 }
    ]
  },
  {
    id: 8,
    name: "Adidas Samba OG 'Cloud White'",
    brand: "Adidas",
    price: 100,
    lastSale: 95,
    image: "https://tse3.mm.bing.net/th/id/OIP.jqpSclDb42HXaKTAdqEL9gHaHa?pid=Api&P=0&h=220",
    rating: 4.5,
    reviews: 500,
    marketIndex: [90, 95, 100, 105, 100, 98, 100],
    sentiment: 85,
    sellers: [
      { id: 's11', name: "ClassicKicks", price: 100, delivery: "3 days", condition: "New", trust: 95 }
    ]
  },
  {
    id: 9,
    name: "Converse Chuck 70 High",
    brand: "Converse",
    price: 90,
    lastSale: 85,
    image: "https://i.pinimg.com/originals/f7/9f/4c/f79f4cc1b0fc6b8be1db6a9fc820dd10.jpg",
    rating: 4.8,
    reviews: 600,
    marketIndex: [85, 88, 90, 92, 90, 89, 90],
    sentiment: 80,
    sellers: [
      { id: 's12', name: "AllStarVault", price: 90, delivery: "3 days", condition: "New", trust: 98 }
    ]
  },
  {
    id: 10,
    name: "Vans Old Skool 'Black'",
    brand: "Vans",
    price: 70,
    lastSale: 65,
    image: "https://tse3.mm.bing.net/th/id/OIP.qQ2Q6-itsO5mV_wiiIeuvAHaD4?pid=Api&P=0&h=220",
    rating: 4.6,
    reviews: 450,
    marketIndex: [65, 68, 70, 72, 70, 68, 70],
    sentiment: 82,
    sellers: [
      { id: 's13', name: "SkateShop", price: 70, delivery: "4 days", condition: "New", trust: 96 }
    ]
  }
];

const categories = ["All", "Jordan", "Nike", "Adidas", "New Balance", "Converse", "Vans", "Accessories"];

// 10-Point Quality Check Standards
const qualityStandards = [
  "Box Label & Packaging Verification",
  "Inner Size Tag & Font Analysis",
  "Sole Pattern & Rubber Quality Match",
  "Insole Gluing & Stitching Check",
  "UV Light Inspection (Invisible Ink)",
  "Leather Texture & Material Grain",
  "Heel Shape Symmetry & Hourglass Shape",
  "Toe Box Perforation Alignment",
  "Lace Bag Packaging & Font",
  "Odor/Smell Test (Glue vs Factory Smell)"
];

// Mock Orders for Tracking
const orders = [
  {
    id: "ORD-7782-XJ",
    productId: 1,
    productName: "Air Jordan 1 'Lost & Found'",
    customer: "Demo User",
    price: 450,
    status: "In Transit",
    purchaseDate: "2023-11-01",
    trackingSteps: [
      { status: "Order Placed", date: "2023-11-01 10:00 AM", completed: true },
      { status: "Seller Ship", date: "2023-11-02 09:00 AM", completed: true },
      { status: "Arrived at Authentication Center", date: "2023-11-03 10:00 AM", completed: true },
      { status: "Quality Check Passed (10/10)", date: "2023-11-03 02:00 PM", completed: true, details: "Verified Authentic" },
      { status: "Shipped to You", date: "2023-11-04 10:00 AM", completed: true },
      { status: "Out for Delivery", date: null, completed: false }
    ]
  },
  {
    id: "ORD-9921-RF",
    productId: 3,
    productName: "Nike Dunk Low 'Panda'",
    customer: "Demo User",
    price: 180,
    status: "Refunded",
    purchaseDate: "2023-10-15",
    trackingSteps: [
      { status: "Order Placed", date: "2023-10-15 11:30 AM", completed: true },
      { status: "Seller Ship", date: "2023-10-16 09:15 AM", completed: true },
      { status: "Quality Check Failed", date: "2023-10-18 01:00 PM", completed: true, details: "Stitching inconsistencies detected" },
      { status: "Order Cancelled", date: "2023-10-18 01:30 PM", completed: true },
      { status: "Refund Processed", date: "2023-10-19 10:00 AM", completed: true }
    ]
  }
];

// Mock Reviews
const reviews = [
  { id: 101, productId: 1, user: "Alex K.", rating: 5, comment: "Authentic pair, box was pristine. Fast shipping!", date: "2023-10-15" },
  { id: 102, productId: 1, user: "Sarah J.", rating: 4, comment: "Great shoes, but delivery took a day longer than expected.", date: "2023-10-18" },
  { id: 103, productId: 3, user: "Mike T.", rating: 5, comment: "Pandas are classic. Authentication tag was attached.", date: "2023-11-02" }
];

module.exports = { products, categories, qualityStandards, orders, reviews };