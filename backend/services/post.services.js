const postRepository = require('../repository/post.repository');
const slugify = require('slugify');

exports.createPost = async (data, userId) => {
    const { titulo, conteudo, resumo, tempoLeitura, status } = data;

    if (!titulo || !conteudo) {
        throw new Error("Título e conteúdo são obrigatórios");
    }

    if (tempoLeitura <= 0 ) {
        const error = new Error("Tempo de leitura deve ser maior que zero");
        error.statusCode = 400;
        throw error;
    }

    if (!resumo) {
        throw new Error("Resumo é obrigatório");
    }

    const slug = slugify(titulo, { lower: true, strict: true });

    return await postRepository.createPost({
        titulo,
        slug,
        conteudo,
        resumo,
        tempoLeitura,
        autorId: userId,
        status
    });
};

exports.getAllPosts = async () => {
    return await postRepository.findAll();
};

exports.getPostBySlug = async (slug) => {
    const post = await postRepository.findBySlug(slug);

    if (!post) {
        throw new Error("Post não encontrado");
    }

    return post;
};

exports.updatePost = async (id, data, userId) => {
    const post = await postRepository.findById(id);
    if (!post) {
        throw new Error("Post não encontrado");
    }

    if (post.autorId !== userId) {
        const error = new Error("Apenas o autor pode atualizar este post");
        error.statusCode = 403;
        throw error;
    }

    return await postRepository.updatePost(id, data);
};

exports.archivePost = async (id) => {
    await postRepository.archivePost(id);
};