import estilo from './CadastroPage.module.css'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CadastroPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [errorPass, setErrorPass] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);

        setError("");
        setFieldErrors({});

        if (password !== confirmPassword) {
            setFieldErrors({ confirmPassword: "As senhas não coincidem." });
            return;
        }

        try {

            const erros = {};
            if (!name) {
                erros.name = "Nome é obrigatório";
            }
            if (!email) {
                erros.email = "Email é obrigatório";
            }
            if (!password) {
                erros.password = "Senha é obrigatória";
            }
            if (!confirmPassword) {
                erros.confirmPassword = "Confirmação de senha é obrigatória";
            }
            if (Object.keys(erros).length > 0) {
                setFieldErrors(erros);
                return;
            }

            const response = await fetch("http://localhost:8080/auth/cadastro", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    confirmPassword
                })
            });

            console.log(name, email, password, confirmPassword);
            const data = await response.json();

            if (!response.ok) {
                if (data.message === "E-mail já cadastrado") {
                    setFieldErrors({ email: data.message });
                } else if (data.message === "As senhas não coincidem") {
                    setFieldErrors({ confirmPassword: data.message });
                    setIsSubmitting(false);
                    return;
                } else {
                    setError(data.message || "Erro no cadastro");
                }
                return;
            }

            alert(data.message || "Cadastro realizado com sucesso!");
            navigate("/login");

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

        } catch (error) {
            setError(error.message || "Erro no cadastro");

        } finally {
            setIsSubmitting(false);
        }
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (password !== e.target.value) {
            setFieldErrors({ confirmPassword: "As senhas não coincidem." });
        } else {
            setFieldErrors((prev) => {
                const { confirmPassword, ...rest } = prev;
                return rest;
            }); 
        }
    }


    return (
        <div className={estilo['register-page']}>

            <div className={estilo['register-card']}>

                <h1 className={estilo['register-title']}>
                    Cadastro de Autor
                </h1>

                <form onSubmit={handleSubmit} className={estilo['register-form']}>
                    {error && (
                        <div className={estilo['error-box']}>
                            {error}
                        </div>
                    )}

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

                    {fieldErrors.password && (
                        <span className={estilo['error-text']}>
                            {fieldErrors.password}
                        </span>
                    )}

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
                    
                    {fieldErrors.confirmPassword && (
                        <span className={estilo['error-text']}>
                            {fieldErrors.confirmPassword}
                        </span>
                    )}

                    <button
                        type="submit"
                        className={estilo['register-button']}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className={estilo['spinner']}></span>
                        ) : (
                            "Cadastrar"
                        )}
                    </button>

                </form>

            </div>

        </div>
    )
}
