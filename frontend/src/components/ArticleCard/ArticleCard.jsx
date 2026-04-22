import estilo from './ArticleCard.module.css';

export default function ArticleCard({categoria, status, titulo, resumo, data, leitura, views, shares}) {

    const statusClass = status === 'Publicado' ? estilo['status-published'] : estilo['status-draft'];

    return (
        <div className={estilo['article-card']}>
            <div className={estilo['article-info']}>
                <div className={estilo['article-category-status']}>
                    <p>{categoria}</p>
                    <p className={statusClass}>{status.charAt(0).toUpperCase() + status.slice(1)}</p>
                </div>
                <h2 className={estilo['article-title']}>{titulo}</h2>
                <p className={estilo['article-summary']}>{resumo}</p>
                <p className={estilo['article-date']}>{data} • {leitura} min de leitura</p>
                <div className={estilo['article-metrics']}>
                    <span>{views} views</span>
                    <span>{shares} shares</span>
                    <div className={estilo['article-actions']}>
                        <button className={estilo['article-button-edit']}>Editar</button>
                        <button className={estilo['article-button-delete']}>Excluir</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
