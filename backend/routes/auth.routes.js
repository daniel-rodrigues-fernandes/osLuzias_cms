const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// POST /auth/cadastro
router.post('/auth/cadastro', authController.signupAutor);

module.exports = router;