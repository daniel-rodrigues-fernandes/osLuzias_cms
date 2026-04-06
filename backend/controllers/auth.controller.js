const authService = require('../services/autor.service');

export const signupAutor = async (req, res) => {
    try {
        const autorId = await authService.signupAutor(req.body);

        // Redirecionar para a página de login ou enviar uma resposta de sucesso
        return res.redirect('/login');
        // res.status(201).json({ message: 'Autor criado com sucesso', autorId });
    } catch (error) {
        console.error('Error creating autor:', error);
        return res.status(400).json({ error: error.message });
    }
}