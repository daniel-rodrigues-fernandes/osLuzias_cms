import estilo from "./LoginPage.module.css"
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();

        console.log(email, password);
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

                    <button className={estilo['login-button']}>
                        Entrar
                    </button>

                </form>

            </div>

        </div>
    )
}
