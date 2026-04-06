const autorRepository = require('../repositories/autor.repository');

exports.criarAutor = async (autorData) => {
    try {
        const result = await autorRepository.createAutor(autorData);
        return result;
    } catch (error) {
        console.error('Error creating autor:', error);
        throw error;
    } 
};
