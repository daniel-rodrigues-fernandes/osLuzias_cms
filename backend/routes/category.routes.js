const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const express = require('express');
const router = express.Router();

// Públicas
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.get('/slug/:slug', categoryController.getCategoryBySlug);

// Protegidas
router.post('/', authMiddleware, categoryController.createCategory);
router.delete('/:id', authMiddleware, categoryController.deleteCategory);
router.put('/:id', authMiddleware, categoryController.updateCategory);

module.exports = router;