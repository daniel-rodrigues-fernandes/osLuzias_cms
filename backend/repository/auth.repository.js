const db = require('../database/connection')

exports.findByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM autores WHERE email = ?', [email]);
    return rows[0]; // retorna o primeiro usuário encontrado ou undefined se não houver
};

exports.createAutor = async ({ nome, email, senhaHash }) => {
    try {
        const [result] = await db.query('INSERT INTO autores (nome, email, senhaHash) VALUES (?, ?, ?)', [nome, email, senhaHash]);
        return result.insertId;
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}