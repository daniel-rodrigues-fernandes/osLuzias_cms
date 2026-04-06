const autorRepository = require('../repository/auth.repository');

exports.findAuthorByEmail = async (email) => {
    try {
        const author = await autorRepository.getAuthorByEmail(email);
        return author;
    } catch (error) {
        console.error('Error finding author by email:', error);
        throw error;
    }
};