const authRepository = require('../repositories/autor.repository');

exports.postSignup = async (data) => {
    try {
        const result = await authRepository.postSignup(data);
        return result;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    } 
};
