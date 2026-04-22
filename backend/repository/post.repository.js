
const db = require('../database/connection');

exports.createPost = async (post) => {
    const {
        htmlTitle,
        slug,
        htmlContent,
        htmlResumo,
        tempoLeitura,
        autorId,
        status
    } = post;

    const [result] = await db.query(`
        INSERT INTO posts 
        (titulo, slug, conteudo, resumo, tempoLeitura, autorId, status, publicado_em)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        htmlTitle,
        slug,
        htmlContent,
        htmlResumo,
        tempoLeitura,
        autorId,
        status || 'rascunho',
        status === 'publicado' ? new Date() : null
    ]);

    return result.insertId;
};

exports.findPublished = async () => {
    const [rows] = await db.query(`
        SELECT p.*, a.nome AS autor
        FROM posts p
        LEFT JOIN autores a ON a.idAutor = p.autorId
        WHERE status = 'publicado'
        ORDER BY publicado_em DESC
    `);

    return rows;
};

exports.findByAutor = async (autorId) => {
    const [rows] = await db.query(`
        SELECT p.*, a.nome AS autor
        FROM posts p
        LEFT JOIN autores a ON a.idAutor = p.autorId
        WHERE p.autorId = ?
        ORDER BY p.criado_em DESC
    `, [autorId]);

    return rows;
};

exports.findById = async (id) => {
    const [rows] = await db.query(`
        SELECT * FROM posts WHERE idPost = ?
    `, [id]);

    return rows[0];
};

exports.findBySlug = async (slug) => {
    const [rows] = await db.query(`
        SELECT p.*, a.nome AS autor
        FROM posts p
        LEFT JOIN autores a ON a.idAutor = p.autorId
        WHERE slug = ? AND status = 'publicado'
        LIMIT 1
    `, [slug]);

    return rows[0];
};

exports.updatePost = async (id, data) => {
    const fields = [];
    const values = [];

    for (let key in data) {
        fields.push(`${key} = ?`);
        values.push(data[key]);
    }

    values.push(id);

    await db.query(`
        UPDATE posts SET ${fields.join(', ')}
        WHERE idPost = ?
    `, values);
};

exports.archivePost = async (id) => {
    await db.query(`
        UPDATE posts 
        SET status = 'arquivado', arquivado_em = NOW()
        WHERE idPost = ?
    `, [id]);
};