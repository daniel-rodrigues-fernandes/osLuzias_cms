const db = require('../database/connection');

exports.createIfNotExists = async (postId) => {
    await db.query(
        `INSERT INTO post_metricas (postId) VALUES (?) ON DUPLICATE KEY UPDATE postId = postId`,
        [postId]
    );
};

exports.incrementViews = async (postId) => {
    await db.query(
        `UPDATE post_metricas SET visualizacoes = visualizacoes + 1 WHERE postId = ?`,
        [postId]
    );
};

exports.incrementShares = async (postId) => {
    await db.query(
        `UPDATE post_metricas SET compartilhamentos = compartilhamentos + 1 WHERE postId = ?`,
        [postId]
    );
};

exports.updateReadingTime = async (postId, tempo) => {
    await db.query(
        `UPDATE post_metricas 
         SET tempo_medio_leitura = ?
         WHERE postId = ?`,
        [tempo, postId]
    );
};

exports.getByPostId = async (postId) => {
    const [rows] = await db.query(
        `SELECT * FROM post_metricas WHERE postId = ?`,
        [postId]
    );

    return rows[0];
};