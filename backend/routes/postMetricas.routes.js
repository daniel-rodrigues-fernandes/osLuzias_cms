const express = require('express');
const router = express.Router();
const controller = require('../controllers/postMetricas.controller');

router.post('/:postId/view', controller.addView);
router.post('/:postId/share', controller.addShare);
router.get('/:postId', controller.getMetrics);

module.exports = router;