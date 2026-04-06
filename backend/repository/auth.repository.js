const db = require('../database/connection')

exports.postSignup = async (data) => {
    try {
        const { name, email, password, confirm_password } = data;
        if (password !== confirm_password) {
            throw new Error('Passwords do not match');
        }
        const [result] = await db.query('INSERT INTO autor (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
        
        return result.insertId;
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}