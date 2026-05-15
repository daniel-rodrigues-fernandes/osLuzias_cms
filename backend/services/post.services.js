const postRepository = require('../repository/post.repository');
const { parseMarkdown } = require('../utils/converteMarkdownParaHtml');
const { calcularTempoLeitura } = require('../utils/calcularTempoLeitura');
const slugify = require('slugify');

exports.createPost = async (data, userId) => {
    const { titulo, conteudo, resumo, status } = data;

    if (!titulo || !conteudo) {
        throw new Error("Título e conteúdo são obrigatórios");
    }

    if (!resumo) {
        throw new Error("Resumo é obrigatório");
    }

    const htmlContent = parseMarkdown(conteudo);
    const tempoLeitura = calcularTempoLeitura(htmlContent);


    const slug = slugify(titulo, { lower: true, strict: true });

    return await postRepository.createPost({
        titulo,
        slug,
        conteudo,
        htmlContent,
        resumo,
        tempoLeitura,
        autorId: userId,
        status
    });
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

    console.log("Updating post ID:", id, "with data:", data);
    const { titulo, conteudo, resumo, categoria, status } = data;

    if (!titulo || !conteudo) {
        throw new Error("Título e conteúdo são obrigatórios");
    }
    if (!resumo) {
        throw new Error("Resumo é obrigatório");
    }

    const slug = slugify(titulo, { lower: true, strict: true });

    const conteudo_html = parseMarkdown(conteudo);
    const tempoLeitura = calcularTempoLeitura(conteudo_html);

    return await postRepository.updatePost(id, { titulo, slug, conteudo, categoria, conteudo_html, resumo, tempoLeitura, status });
};

exports.getAllPostsPublished = async () => {
    return await postRepository.findPublished();
};

exports.getPostsDoAutor = async (autorId) => {
    if (!autorId) {
        throw new Error("Autor não autenticado");
    }

    return await postRepository.findByAutor(autorId);
};

exports.getPostBySlug = async (slug) => {
    const post = await postRepository.findBySlug(slug);

    if (!post) {
        throw new Error("Post não encontrado");
    }

    return post;
};

exports.getById = async (id) => {
    const post = await postRepository.findById(id);
    if (!post) {
        throw new Error("Post não encontrado");
    }
    return post;
};

exports.archivePost = async (id) => {
    await postRepository.archivePost(id);
};

exports.getMetricasDoAutor = async (autorId) => {
    if (!autorId) {
        throw new Error("Autor não autenticado");
    }

    return await postRepository.findMetricsByAutor(autorId);
}