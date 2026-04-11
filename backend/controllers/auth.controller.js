const authService = require('../services/auth.services');
const jwt = require('jsonwebtoken');
const SECRET = "sua_chave_secreta_aqui"; // Substitua por uma chave secreta forte

exports.signupAutor = async (req, res) => {
    try {
        const autorId = await authService.signupAutor(req.body);
        return res.status(201).json({
            sucess: true,
            message: 'Autor cadastrado com sucesso',
            data: {
                autorId
            }
        });
        
    } catch (error) {
        // console.error('Error creating autor:', error);
        return res.status(400).json({ 
            sucess: false,
            message: error.message });
    }
}

exports.loginAutor = async (req, res) => {
    try {
        const user = await authService.loginAutor(req.body);
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1d' });
        return res.status(200).json({ message: 'Login realizado com sucesso', token });
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}