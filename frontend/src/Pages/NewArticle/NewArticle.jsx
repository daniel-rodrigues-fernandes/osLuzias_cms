import { useEffect, useState } from 'react';
import { useNavigate, useLoaderData, useParams, useRevalidator } from 'react-router-dom';
import { FaPlusCircle } from "react-icons/fa";
import estilo from './NewArticle.module.css'

export default function NewArticle() {
    const navigate = useNavigate();
    const { id } = useParams();
    const {categorias, artigo} = useLoaderData();
    const { revalidate } = useRevalidator();
    const isEditMode = Boolean(id);
    const [isSubmitting, setIsSubmitting] = useState({
        save: false,
        publish: false,
        discard: false
    });
    const [article, setArticle] = useState({
        titulo: "",
        resumo: "",
        conteudo: "",
        categoria: ""
    });
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
    const [newCategory, setNewCategory] = useState("");

    function handleChangeAddCategory(e) {
        setNewCategory(e.target.value);
    }

    useEffect(() => {
        if (isEditMode && artigo) {
            setArticle({
                titulo: artigo.titulo || "",
                resumo: artigo.resumo || "",
                conteudo: artigo.conteudo_md || "",
                categoria: artigo.categoria || ""
            });
        } else {
            setArticle({
                titulo: "",
                resumo: "",
                conteudo: "",
                categoria: ""
            });
        }
    }, [isEditMode, artigo]);

    function handleClickShowAddCategoryForm(e) {
        setShowAddCategoryForm(prev => !prev)
        e.target.name === 'cancelar' ? setNewCategory("") : null; 
    }

    async function handleClickAddCategory() {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8080/categorias", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                method: "POST",
                body: JSON.stringify({ nome: newCategory })
            });
            const data = await response.json();
            if (response.ok) {
                console.log("Category added successfully:", data, "data.message:", data.message);
                alert(data.message);
                setArticle(prev => ({ ...prev, categoria: newCategory }));
                setNewCategory("");
                setShowAddCategoryForm(false);
                revalidate();
            } else if (response.status === 401) {
                alert(data.message || "Sessão expirada. Faça login novamente.");
                localStorage.removeItem("token");
                navigate("/login");
            }
        } catch (error) {
            console.log("Error adding category:", error);
        }
    }


    function handleChange(e) {
        const { name, value } = e.target;
        setArticle(prev => ({ ...prev, [name]: value }));
    }

    async function handleClick(e) {
        if (e.target.name === "discard") {
            setArticle({
                titulo: "",
                resumo: "",
                conteudo: "",
                categoria: ""
            });
            alert("Artigo descartado");
            setIsSubmitting(prev => ({ ...prev, [e.target.name]: false }));
            return;
        }

        setIsSubmitting(prev => ({ ...prev, [e.target.name]: true }));

        let post = {}

        if (!article.titulo || !article.resumo || !article.conteudo || !article.categoria) {
            alert("Todos os campos são obrigatórios");
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

        let url = "http://localhost:8080/posts";
        let method = "POST";

        if (isEditMode) {
            url = `http://localhost:8080/posts/${id}`;
            method = "PUT";
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                method: method,
                body: JSON.stringify(post)
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setArticle({
                    titulo: "",
                    resumo: "",
                    conteudo: "",
                    categoria: ""
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
                <h1 className={estilo['header-title']}>{isEditMode ? "Editar artigo" : "Novo artigo"}</h1>
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
                <div className={estilo['category-group']}>
                    <div className={estilo['form-group']}>
                        <label htmlFor="categoria">Categoria:</label>
                        <select
                            id="categoria"
                            name="categoria"
                            value={article.categoria || ""}
                            onChange={handleChange}>
                            <option value="">Selecione uma categoria</option>
                            {categorias && categorias.map((cat) => (
                                <option key={cat.id} value={cat.nome}>{cat.nome}</option>
                            ))}
                        </select>
                    </div>
                    {!showAddCategoryForm ? (
                        <FaPlusCircle
                            className={estilo['add-category-icon']}
                            title="Adicionar nova categoria"
                            onClick={handleClickShowAddCategoryForm}
                        />
                    ) : (
                        <div className={estilo['add-category-form']}>
                            <input
                                type="text"
                                placeholder="Informe a nova categoria"
                                value={newCategory}
                                onChange={handleChangeAddCategory}
                            />
                            <div className={estilo['add-category-form__buttons']}>
                                <button onClick={handleClickAddCategory} disabled={!newCategory.trim()}>Adicionar</button>
                                <button onClick={handleClickShowAddCategoryForm} name='cancelar'>Cancelar</button>
                            </div>
                        </div>
                    )}
                </div>
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
