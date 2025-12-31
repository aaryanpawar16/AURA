const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProductById, 
  getCategories,
  getQualityStandards,
  getOrders,
  getReviews
} = require('../controllers/productController');

// Product Routes
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.get('/categories', getCategories);

// Feature Routes
router.get('/quality', getQualityStandards);
router.get('/orders', getOrders);
router.get('/reviews', getReviews);

// Health Check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

module.exports = router;