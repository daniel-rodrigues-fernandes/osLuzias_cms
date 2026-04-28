const db = require('../database/connection');

exports.createCategory = async (category) => {
    const { nome, slug, descricao } = category;
    const [result] = await db.execute(`
        INSERT INTO categories 
        (nome, slug, descricao) 
        VALUES (?, ?, ?)`,
        [nome, slug, descricao]);
    return result.insertId;
};

exports.findAll = async () => {
    const [rows] = await db.execute(`SELECT * FROM categories`);
    return rows;
};

exports.findById = async (id) => {
    const [rows] = await db.execute(`SELECT * FROM categories WHERE id = ?`, [id]);
    return rows[0];
};

exports.findBySlug = async (slug) => {
    const [rows] = await db.execute(`SELECT * FROM categories WHERE slug = ?`, [slug]);
    return rows[0];
};

exports.delete = async (id) => {
    await db.execute(`DELETE FROM categories WHERE id = ?`, [id]);
};  

exports.update = async (id, category) => {
    const { nome, slug, descricao } = category;
    await db.execute(`
        UPDATE categories 
        SET nome = ?, slug = ?, descricao = ? 
        WHERE id = ?`,
        [nome, slug, descricao, id]);
};