const postService = require('../services/post.services');

exports.createPost = async (req, res) => {
    try {
        const userId = req.user.id; // vindo do JWT

        const postId = await postService.createPost(req.body, userId);

        return res.status(201).json({
            message: "Post criado com sucesso",
            postId
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

exports.getAllPostsPublished = async (req, res) => {
    const posts = await postService.getAllPostsPublished();
    res.json(posts);
};

exports.getMyPosts = async (req, res) => {
    try {
        const autorId = req.user.id; // vindo do middleware JWT

        const posts = await postService.getPostsDoAutor(autorId);

        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPostBySlug = async (req, res) => {
    try {
        const post = await postService.getPostBySlug(req.params.slug);
        res.json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
       
        const post = await postService.getById(req.params.id);
        res.json(post);
    } catch (error) {
        res.status(404).json({ message: error.message }); // Inclui o ID no log de erro para diagnóstico
    }
};


exports.updatePost = async (req, res) => {

    try {
        const updated = await postService.updatePost(
            req.params.id,
            req.body,
            req.user.id
        );

        res.json({ message: "Post atualizado com sucesso" });
    } catch (error) {
        res.status(error.status || 400 ).json({ message: error.message });
    }
};

exports.archivePost = async (req, res) => {
    await postService.archivePost(req.params.id);

    res.json({ message: "Post arquivado" });
};