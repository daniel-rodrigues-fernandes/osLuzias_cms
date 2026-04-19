const bcrypt = require('bcrypt');
const authRepository = require('../repository/auth.repository');
const jwt = require('jsonwebtoken');

exports.signupAutor = async (data) => {
    const { name, email, password, confirmPassword } = data;

    if (!name || !email || !password) {
        throw new Error('Campos obrigatórios não preenchidos');
    }

    if (password !== confirmPassword) {
        throw new Error('Senhas não coincidem');
    }

    const existingUser = await authRepository.findByEmail(email);

    if (existingUser) {
        throw new Error('Email já cadastrado');
    }

    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(password, saltRounds);

    const autorId = await authRepository.createAutor({
        nome: name,
        email,
        senhaHash
    });

    return autorId;
};

exports.loginAutor = async (data) => {
    const { email, password } = data;

    if (!email || !password) {
        throw new Error('Email e senha são obrigatórios');
    }

    const user = await authRepository.findByEmail(email);

    if (!user) {
        throw new Error('Email ou senha incorretos');
    }

    const isMatch = await bcrypt.compare(password, user.senhaHash);

    if (!isMatch) {
        throw new Error('Email ou senha incorretos');
    }

    // 🔐 Gerar token AQUI (melhor prática)
    const token = jwt.sign(
        {
            id: user.idAutor, // ⚠️ corrigido (antes estava user.id)
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return token;
};