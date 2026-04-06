const bcrypt = require('bcrypt');
const authRepository = require('../repository/auth.repository');

exports.signupAutor = async (data) => {
    const { name, email, password, confirmPassword } = data;
    // Validar senha
    if (password !== confirmPassword) {
        throw new Error('Passwords do not match' + password + " - " + confirmPassword);
    }

    // Verificar se o email já existe
    console.log('Verificando email...')
    const existingUser = await authRepository.findByEmail(email);
    console.log('Resultado:', existingUser)
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

exports.loginAutor = async (data) => {
    const { email, password } = data;
    const user = await authRepository.findByEmail(email);
    if (!user) {
        throw new Error('Email ou senha incorretos');
    }
    const isMatch = await bcrypt.compare(password, user.senhaHash);
    if (!isMatch) {
        throw new Error('Email ou senha incorretos');
    }
    return user;
};