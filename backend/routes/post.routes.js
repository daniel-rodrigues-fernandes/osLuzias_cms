const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// públicas
router.get('/', postController.getAllPostsPublished);
router.get('/:slug', postController.getPostBySlug);

// protegidas
router.get('/me/posts', authMiddleware, postController.getMyPosts);
router.get('/me/:id', authMiddleware, postController.getById); // nova rota para buscar por ID

// protegidas
router.post('/', authMiddleware, postController.createPost);
router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.archivePost);

module.exports = router;