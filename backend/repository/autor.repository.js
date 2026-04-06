const db = require('../database/connection')

exports.createAutor = async (data) => {
    try {
        const { name, email, password } = data;
        const [result] = await db.query('INSERT INTO autor (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
        
        return result.insertId;
    }
    catch (error) {
        console.error('Error creating autor:', error);
        throw error;
    }
}