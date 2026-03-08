import estilo from './CadastroPage.module.css'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';

export default function CadastroPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [errorPass, setErrorPass] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        try {

            const response = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erro no cadastro");
            }

            alert("Cadastro realizado com sucesso!");

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

        } catch (error) {

            console.error(error);
            alert("Erro ao cadastrar usuário.");

        }
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setErrorPass(password !== e.target.value);
    }


    return (
        <div className={estilo['register-page']}>

            <div className={estilo['register-card']}>

                <h1 className={estilo['register-title']}>
                    Cadastro de Autor
                </h1>

                <form onSubmit={handleSubmit} className={estilo['register-form']}>

                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={estilo['register-input']}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={estilo['register-input']}
                        required
                    />
                    <div className={estilo['password-container']}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <span
                            className={estilo['password-eye']}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <div className={estilo['password-container']}>
                        <input
                            type={showPasswordConfirm ? "text" : "password"}
                            placeholder="Confirmar senha"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className={estilo['register-input']}
                            required
                        />

                        <span
                            className={estilo['password-eye']}
                            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                        >
                            {showPasswordConfirm ? <FaEyeSlash /> : <FaEye />}
                        </span>

                    </div>
                    <p className={estilo['error-password']}>
                        {errorPass && "As senhas não coincidem."}
                    </p>



                    <button
                        type="submit"
                        className={estilo['register-button']}
                    >
                        Criar conta
                    </button>

                </form>

            </div>

        </div>
    )
}
