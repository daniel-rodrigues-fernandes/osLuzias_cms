const express = require('express');
const router = express.Router();
const autorController = require('../controllers/autor.controller');


router.get('/email/:email', autorController.findAuthorByEmail);



module.exports = router;