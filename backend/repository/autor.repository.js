const db = require('../database/connection')

exports.getAuthorByEmail = async (email) => {
    try {
        const [rows] = await db.query('SELECT * FROM autor WHERE email = ?', [email]);
        return rows[0];
    } catch (error) {
        console.error('Error fetching author by email:', error);
        throw error;
    }
};