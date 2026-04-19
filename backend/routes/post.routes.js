const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// públicas
router.get('/', postController.getAllPosts);
router.get('/:slug', postController.getPostBySlug);

// protegidas
router.post('/', authMiddleware, postController.createPost);
router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.archivePost);

module.exports = router;