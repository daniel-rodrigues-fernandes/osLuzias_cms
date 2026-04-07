const authService = require('../services/auth.services');

exports.signupAutor = async (req, res) => {
    try {
        const autorId = await authService.signupAutor(req.body);
        return res.status(201).json({
            message: 'Autor criado com sucesso', autorId
        });
        
    } catch (error) {
        console.error('Error creating autor:', error);
        return res.status(400).json({ error: error.message });
    }
}

exports.loginAutor = async (req, res) => {
    try {
        const token = await authService.loginAutor(req.body);
        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(401).json({ message: error.message });
    }
}