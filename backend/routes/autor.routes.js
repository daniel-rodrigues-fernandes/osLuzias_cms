const express = require('express');

const router = express.Router();

const autorController = require('../controllers/autor.controller');

// POST /cadasstro
router.post('/cadastro', autorController.criarAutor);

module.exports = router;