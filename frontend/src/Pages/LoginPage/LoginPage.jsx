import estilo from "./LoginPage.module.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        setIsSubmitting(true);

        try {

            const response = await fetch("http://localhost:8080/auth/login", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Erro no login");
                return;
            }

            alert("Login realizado com sucesso!");
            navigate("/app");

            setEmail("");
            setPassword("");

        } catch (error) {
            console.error("Error logging in:", error);
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <div className={estilo['login-page']}>

            <div className={estilo['login-card']}>

                <h1 className={estilo['login-title']}>Os Luzias | Login</h1>

                <form className={estilo['login-form']} onSubmit={handleLogin}>

                    <input
                        className={estilo['login-input']}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className={estilo['password-container']}>

                        <input
                            className={estilo['login-input']}
                            type={showPassword ? "text" : "password"}
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <span
                            className={estilo['password-eye']}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>

                    </div>

                    <button className={estilo['login-button']} disabled={isSubmitting}>
                        {isSubmitting ? (
                            <span className={estilo['spinner']}></span>
                        ) : (
                            "Entrar"
                        )}
                    </button>

                    {/* Lista de erros */}

                </form>

            </div>

        </div>
    )
}
