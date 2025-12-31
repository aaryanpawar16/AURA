// This file handles all API requests for Vercel
const { products, categories, qualityStandards, orders, reviews } = require('../backend/data/store.js');

module.exports = (req, res) => {
  const { url } = req;

  // Set CORS headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle Options for CORS pre-flight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // --- ROUTING LOGIC ---
  
  // GET /api/products
  if (url.includes('/api/products')) {
    // Extract ID if present (e.g. /api/products/1)
    const idMatch = url.match(/\/api\/products\/(\d+)/);
    if (idMatch) {
      const id = parseInt(idMatch[1]);
      const product = products.find(p => p.id === id);
      return product ? res.json(product) : res.status(404).json({ error: "Product not found" });
    }

    // Check for query params manually (e.g. ?category=Nike)
    // Note: Vercel provides req.query but we are doing raw URL check for simplicity in migration
    const urlObj = new URL(url, `http://${req.headers.host}`);
    const category = urlObj.searchParams.get('category');

    if (category && category !== 'All') {
      const filtered = products.filter(p => p.brand.toLowerCase() === category.toLowerCase());
      return res.json(filtered);
    }
    return res.json(products);
  }

  // GET /api/categories
  if (url.includes('/api/categories')) {
    return res.json(categories);
  }

  // GET /api/quality
  if (url.includes('/api/quality')) {
    return res.json(qualityStandards);
  }

  // GET /api/orders
  if (url.includes('/api/orders')) {
    return res.json(orders);
  }

  // GET /api/reviews
  if (url.includes('/api/reviews')) {
    return res.json(reviews);
  }

  // Default
  res.status(404).json({ error: "Route not found" });
};