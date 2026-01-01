Aura Marketplace

Aura is a premium, full-stack marketplace application designed for high-ticket items like limited-edition sneakers, electronics, and collectibles. It distinguishes itself with a focus on trust, transparency (10-point quality checks), and a high-end, immersive user interface.

Video Demo: https://www.youtube.com/watch?v=8pqwEUdNuVY

<img width="1895" height="788" alt="image" src="https://github.com/user-attachments/assets/c89f4f27-fa0a-4097-a2fb-d6f451d5ccf2" />

<img width="1889" height="897" alt="image" src="https://github.com/user-attachments/assets/a6651be3-7d90-4f03-95d5-4d51e5db3858" />

<img width="1919" height="834" alt="image" src="https://github.com/user-attachments/assets/5d5cf533-8223-4a0d-beec-87bff561be37" />


🚀 Key Features

** immersive UI**: Features a custom "Wavy Background" and "Card Spotlight" effects powered by Framer Motion.

Seller Trust Scores: Allows buyers to compare multiple sellers based on price, delivery speed, and a calculated Trust Score.

10-Point Authenticity Check: A transparent verification process integrated into the order tracking timeline.

Real-Time Order Tracking: Detailed visual timeline including "Quality Check Passed/Failed" statuses and digital certificate generation.

Dynamic Cart System: Fully functional shopping cart with real-time total calculations.

Smart Search: Instant filtering of products by name or brand.

🛠️ Tech Stack

Frontend:

React.js

Tailwind CSS (v4.0)

Framer Motion (Advanced Animations)

Lucide React (Icons)

Backend:

Node.js

Express.js

REST API Architecture

📂 Project Structure

/
├── backend/                # Backend API Server
│   ├── controllers/        # Logic for Products, Orders, Reviews
│   ├── data/               # Mock Database (store.js)
│   ├── routes/             # API Route Definitions
│   ├── server.js           # Server Entry Point
│   └── package.json        # Backend Dependencies
├── src/
│   └── App.jsx             # Main Frontend Application
└── README.md


⚡ Getting Started

1. Start the Backend

The frontend relies on the backend for data. Start this first.

Open a terminal and navigate to the backend folder:

cd backend


Install the required packages:

npm install


Start the server:

npm start


You should see: 🚀 Aura Backend Server running on port 5000

2. Start the Frontend

Open a new terminal in the project root.

Install dependencies:

npm install


Run the application:

npm run dev


🔌 API Endpoints

The backend runs on http://localhost:5000.

Method

Endpoint

Description

GET

/api/products

Fetch all products

GET

/api/products?category={brand}

Filter products by brand

GET

/api/categories

Get list of available categories

GET

/api/quality

Get the 10-point quality check criteria

GET

/api/orders

Get mock user order history

GET

/api/reviews

Get all product reviews

🌟 Unique Feature Highlight: "Card Spotlight"

The product cards utilize a custom useMotionTemplate effect to track mouse movement, creating a radial gradient "spotlight" that reveals a dot pattern underneath the cursor. This adds a premium, tactile feel to the browsing experience.

🛡️ Trust & Safety

Aura includes a simulated Return & Refund workflow. Check the Tracking tab to see an example order (ORD-9921-RF) that failed the quality check and automatically processed a refund.


© 2026 Aura Marketplace. All rights reserved.



