const autorService = require('../services/autor.service');

export const criarAutor = async (req, res, next) => {
    try {
        const autor = await autorService.criarAutor(req.body);
        res.status(201).json({ id: autorId, message: 'Autor criado com sucesso' });
    }   catch (error) {
        console.error('Error creating autor:', error);
        res.status(500).json({ message: 'Erro ao criar autor' });
    }   
}