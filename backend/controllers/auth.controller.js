const authService = require('../services/auth.services');

exports.signupAutor = async (req, res) => {
    try {
        const autorId = await authService.signupAutor(req.body);

        return res.status(201).json({
            success: true, // ⚠️ corrigido (sucess → success)
            message: 'Autor cadastrado com sucesso',
            data: {
                autorId
            }
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.loginAutor = async (req, res) => {
    try {
        const token = await authService.loginAutor(req.body);

        return res.status(200).json({
            success: true,
            message: 'Login realizado com sucesso',
            token
        });

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};