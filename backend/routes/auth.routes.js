const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller');

// POST /cadasstro
router.post('/cadastro', authController.postSignup);

module.exports = router;