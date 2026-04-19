const postRepository = require('../repository/post.repository');
const slugify = require('slugify');

exports.createPost = async (data, userId) => {
    const { titulo, conteudo, resumo, tempoLeitura, status } = data;

    if (!titulo || !conteudo) {
        throw new Error("Título e conteúdo são obrigatórios");
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

exports.updatePost = async (id, data) => {
    await postRepository.updatePost(id, data);
};

exports.archivePost = async (id) => {
    await postRepository.archivePost(id);
};