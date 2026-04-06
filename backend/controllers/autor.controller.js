const autorService = require('../services/autor.service');

exports.findAuthorByEmail = async (req, res, next) => {
    try {
        const email = req.params.email;
        const author = await autorService.findAuthorByEmail(email);
        res.json(author);
    } catch (error) {
        next(error);
    }
};