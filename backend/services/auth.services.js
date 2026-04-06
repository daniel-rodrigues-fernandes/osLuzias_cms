const bcrypt = require('bcrypt');
const authRepository = require('../repositories/auth.repository');

exports.signupAutor = async (data) => {
    const { name, email, password, confirm_password } = data;
    // Validar senha
    if (password !== confirm_password) {
        throw new Error('Passwords do not match');
    }

    // Verificar se o email já existe
    const existingUser = await authRepository.findByEmail(email);
    if (existingUser) {
        throw new Error('Email já cadastrado');
    }
    // Hash da senha
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(password, saltRounds);

    // Criar usuário no banco
    const autorId = await authRepository.createAutor({ nome: name, email, senhaHash });
    return autorId;
};