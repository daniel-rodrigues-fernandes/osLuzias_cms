import estilo from './NewArticle.module.css'

export default function NewArticle() {
    return (
        <main>
            <header>
                <h1 className={estilo['header-title']}>Novo artigo</h1>
            </header>
            <div>
                <form>
                    <div className={estilo['form-input']}>
                        <label htmlFor="titulo">Título:</label>
                        <input type="text" id="titulo" name="titulo" />
                    </div>
                    <div className={estilo['form-input']}>
                        <label htmlFor="resumo">Resumo:</label>
                        <input type="text" id="resumo" name="resumo" />
                    </div>
                    <div className={estilo['form-input']}>
                        <label htmlFor="conteudo">Conteúdo:</label>
                        <textarea id="conteudo" name="conteudo"></textarea>
                    </div>
                    <div>
                        <button type="submit">Publicar</button>
                    </div>
                </form>
            </div>
        </main>
    )
}
