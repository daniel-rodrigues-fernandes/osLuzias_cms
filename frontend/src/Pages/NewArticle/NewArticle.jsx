import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import estilo from './NewArticle.module.css'

export default function NewArticle() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState({
        save: false,
        publish: false,
        discard: false
    });
    const [article, setArticle] = useState({
        titulo: "",
        resumo: "",
        conteudo: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setArticle(prev => ({ ...prev, [name]: value }));
    }

    async function handleClick(e) {
        setIsSubmitting(prev => ({ ...prev, [e.target.name]: true }));
        let post = {}

        if (!article.titulo || !article.resumo || !article.conteudo) {
            alert("Todos os campos são obrigatórios");
            setIsSubmitting(prev => ({ ...prev, [e.target.name]: false }));
            return;
        }

        if (e.target.name === "discard") {
            setArticle({
                titulo: "",
                resumo: "",
                conteudo: ""
            });
            alert("Artigo descartado");
            setIsSubmitting(prev => ({ ...prev, [e.target.name]: false }));
            return;
        }

        if (e.target.name === "save") {
            post = {
                ...article,
                status: 'rascunho'
            }
        } else if (e.target.name === "publish") {
            post = {
                ...article,
                status: 'publicado'
            }
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8080/posts", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                method: "POST",
                body: JSON.stringify(post)
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setArticle({
                    titulo: "",
                    resumo: "",
                    conteudo: ""
                });
            }

            if (response.status === 401) {
                alert(data.message || "Sessão expirada. Faça login novamente.");
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

        } catch (error) {
            console.log("Error saving post:", error);
        } finally {
            setIsSubmitting(prev => ({ ...prev, [e.target.name]: false }));
        }
    }

    return (
        <main className={estilo['main']}>
            <header className={estilo['header']}>
                <h1 className={estilo['header-title']}>Novo artigo</h1>
                <div className={estilo['header-buttons']}>
                    <button
                        name='save'
                        className={estilo['header-button-save']}
                        onClick={handleClick}
                        disabled={isSubmitting.save}>
                        {isSubmitting.save && <span className={estilo['loading']} />}
                        {isSubmitting.save ? "Salvando" : "Salvar"}
                    </button>
                    <button
                        name='publish'
                        className={estilo['header-button-publicar']}
                        onClick={handleClick}
                        disabled={isSubmitting.publish}>
                        {isSubmitting.publish && <span className={estilo['loading']} />}
                        {isSubmitting.publish ? "Publicando" : "Publicar"}
                    </button>
                    <button
                        name='discard'
                        className={estilo['header-button-descartar']}
                        onClick={handleClick}
                        disabled={isSubmitting.discard}>
                        {isSubmitting.discard && <span className={estilo['loading-discard']} />}
                        {isSubmitting.discard ? "Descartando" : "Descartar"}
                    </button>
                </div>
            </header>
            <div className={estilo['article-form']}>
                <div className={estilo['form-group']}>
                    <label htmlFor="titulo">Título:</label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={article.titulo}
                        onChange={handleChange} />
                </div>
                <div className={estilo['form-group']}>
                    <label htmlFor="resumo">Resumo:</label>
                    <input
                        type="text"
                        id="resumo"
                        name="resumo"
                        value={article.resumo}
                        onChange={handleChange} />
                </div>
                <div className={estilo['form-group']}>
                    <label htmlFor="conteudo">Conteúdo:</label>
                    <textarea
                        id="conteudo"
                        name="conteudo"
                        value={article.conteudo}
                        onChange={handleChange}
                    ></textarea>
                </div>
            </div>
        </main>
    )
}
