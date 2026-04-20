import estilo from './NewArticle.module.css'

export default function NewArticle() {
    return (
        <main>
            <header className={estilo['header']}>
                <h1 className={estilo['header-title']}>Novo artigo</h1>
                <div className={estilo['header-buttons']}>
                    <button className={estilo['header-button']}>Salvar</button>
                    <button className={estilo['header-button']}>Publicar</button>
                    <button className={estilo['header-button']}>Descartar</button>
                </div>
            </header>
                <div className={estilo['article-form']}>
                    <div className={estilo['form-group']}>
                        <label htmlFor="titulo">Título:</label>
                        <input type="text" id="titulo" name="titulo" />
                    </div>
                    <div className={estilo['form-group']}>
                        <label htmlFor="resumo">Resumo:</label>
                        <input type="text" id="resumo" name="resumo" />
                    </div>
                    <div className={estilo['form-group']}>
                        <label htmlFor="conteudo">Conteúdo:</label>
                        <textarea id="conteudo" name="conteudo"></textarea>
                    </div>
                </div>
        </main>
    )
}
