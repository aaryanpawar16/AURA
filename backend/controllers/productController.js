const { products, categories, qualityStandards, orders, reviews } = require('../data/store');

// @desc    Get all products
// @route   GET /api/products
const getProducts = (req, res) => {
  const category = req.query.category;
  if (category && category !== 'All') {
    const filteredProducts = products.filter(p => 
      p.brand.toLowerCase() === category.toLowerCase()
    );
    res.json(filteredProducts);
  } else {
    res.json(products);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
const getProductById = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// @desc    Get categories
// @route   GET /api/categories
const getCategories = (req, res) => {
  res.json(categories);
};

// @desc    Get 10-point quality standards
// @route   GET /api/quality
const getQualityStandards = (req, res) => {
  res.json(qualityStandards);
};

// @desc    Get user orders (mock)
// @route   GET /api/orders
const getOrders = (req, res) => {
  res.json(orders);
};

// @desc    Get reviews
// @route   GET /api/reviews
const getReviews = (req, res) => {
  res.json(reviews);
};

module.exports = {
  getProducts,
  getProductById,
  getCategories,
  getQualityStandards,
  getOrders,
  getReviews
};