
const db = require('../database/connection');

exports.createPost = async (post) => {
    const {
        titulo,
        slug,
        conteudo,
        htmlContent,
        resumo,
        tempoLeitura,
        autorId,
        status
    } = post;

    const [result] = await db.query(`
        INSERT INTO posts 
        (titulo, slug, conteudo_md, conteudo_html, resumo, tempoLeitura, autorId, status, publicado_em)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        titulo,
        slug,
        conteudo,
        htmlContent,
        resumo,
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
        SELECT 
            p.idPost,
            p.titulo,
            p.slug,
            p.resumo,
            p.tempoLeitura,
            p.status,
            p.publicado_em,
            p.criado_em,
            p.atualizado_em,
            p.arquivado_em,
            a.nome AS autor,
            c.nome AS categoriaNome,
            pm.visualizacoes,
            pm.compartilhamentos
        FROM posts p
        LEFT JOIN autores a ON a.idAutor = p.autorId
        LEFT JOIN categorias c ON c.Idcategoria = p.categoriaId
        LEFT JOIN post_metricas pm ON pm.postId = p.idPost
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
    data.conteudo_md = data.conteudo;
    delete data.conteudo;

    // Remove categoria do update direto
    const nomeCategoria = data.categoria;
    delete data.categoria;

    // Busca o ID da categoria
    const [categoriaRows] = await db.query(`
        SELECT idCategoria
        FROM categorias
        WHERE nome = ?
    `, [nomeCategoria]);

    if (categoriaRows.length === 0) {
        throw new Error('Categoria não encontrada');
    }

    // Adiciona o FK no objeto
    data.categoriaId = categoriaRows[0].idCategoria;

    const fields = [];
    const values = [];

    for (let key in data) {
        fields.push(`${key} = ?`);
        values.push(data[key]);
    }

    console.log("Updating post with data:", data);
    console.log("Generated SQL fields:", fields.join(', '));

    values.push(id);
    console.log("Generated SQL values:", values);

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

exports.findMetricsByAutor = async (id) => {
    const [rows] = await db.query(`
        SELECT 
            p.idPost,
            p.titulo,
            c.nome as categoriaNome,
            p.publicado_em,
            p.status
        FROM posts p
        LEFT JOIN categorias c ON p.categoriaId = c.idCategoria
        WHERE p.autorId = ?
        ORDER BY p.criado_em DESC
        LIMIT 5
    `, [id]);

    const metricas = await db.query(`
        SELECT
            COUNT(CASE WHEN status = 'publicado' THEN 1 END) AS total_publicados,
            COUNT(CASE WHEN status = 'rascunho' THEN 1 END) AS total_rascunhos
        FROM posts
    `);

    rows.unshift(metricas[0][0])
    return rows;
    
}