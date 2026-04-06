const authService = require('../services/autor.service');

export const postSignup = async (req, res, next) => {
    try {
        const user = await authService.postSignup(req.body);
        res.status(201).json({ id: user.id, message: 'Usuário criado com sucesso' });
    }   catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Erro ao criar usuário' });
    }   
}