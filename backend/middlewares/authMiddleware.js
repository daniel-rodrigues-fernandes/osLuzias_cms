const jwt = require("jsonwebtoken");
const db = require("../database/connection"); // opcional (para validar usuário)

const SECRET = process.env.JWT_SECRET;

async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        // 1️⃣ Verificar se o header existe
        if (!authHeader) {
            return res.status(401).json({
                message: "Token não fornecido"
            });
        }

        // 2️⃣ Verificar formato "Bearer TOKEN"
        const parts = authHeader.split(" ");

        if (parts.length !== 2) {
            return res.status(401).json({
                message: "Formato do token inválido"
            });
        }

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({
                message: "Formato do token inválido"
            });
        }

        // 3️⃣ Verificar token
        const decoded = jwt.verify(token, SECRET);

        // 4️⃣ (OPCIONAL) verificar se usuário ainda existe
        const [rows] = await db.query(
            "SELECT idAutor, email FROM autores WHERE idAutor = ?",
            [decoded.id]
        );

        if (!rows.length) {
            return res.status(401).json({
                message: "Usuário não encontrado"
            });
        }

        const user = rows[0];

        // 5️⃣ anexar usuário na request
        req.user = {
            id: user.idAutor,
            email: user.email
        };

        return next();

    } catch (error) {

        // 🔥 Tratamento específico JWT
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token expirado"
            });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Token inválido"
            });
        }

        return res.status(500).json({
            message: "Erro interno de autenticação"
        });
    }
}

module.exports = authMiddleware;