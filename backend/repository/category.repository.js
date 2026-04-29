const db = require('../database/connection');

exports.createCategory = async (category) => {
    const { nome, slug, descricao } = category;
    const [result] = await db.execute(`
        INSERT INTO categorias
        (nome, slug, descricao) 
        VALUES (?, ?, ?)
        `, [
        nome,
        slug,
        null
        // descricao
    ]);
    return result.insertId;
};

exports.findAll = async () => {
    const [rows] = await db.execute(`SELECT * FROM categorias`);
    return rows;
};

exports.findById = async (id) => {
    const [rows] = await db.execute(`SELECT * FROM categorias WHERE id = ?`, [id]);
    return rows[0];
};

exports.findBySlug = async (slug) => {
    const [rows] = await db.execute(`SELECT * FROM categorias WHERE slug = ?`, [slug]);
    return rows[0];
};

exports.delete = async (id) => {
    await db.execute(`DELETE FROM categorias WHERE id = ?`, [id]);
};

exports.update = async (id, category) => {
    const { nome, slug, descricao } = category;
    await db.execute(`
        UPDATE categorias 
        SET nome = ?, slug = ?, descricao = ? 
        WHERE id = ?`,
        [nome, slug, descricao, id]);
};