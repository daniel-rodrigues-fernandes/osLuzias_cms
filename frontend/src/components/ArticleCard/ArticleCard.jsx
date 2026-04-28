import { useNavigate } from 'react-router-dom';
import estilo from './ArticleCard.module.css';

export default function ArticleCard({ categoria, status, titulo, resumo, data, leitura, views, shares, id, onDeleteSuccess }) {

    const statusClass = status === 'publicado' ? estilo['status-published'] : status === 'rascunho' ? estilo['status-draft'] : estilo['status-archived'];
    const navigate = useNavigate();
    function handleEditClick() {
        navigate(`/artigos/${id}/editar`);
    }

    async function handleDeleteClick() {

        const token = localStorage.getItem('token');

        if (!token) {
            alert("Sessão expirada. Faça login novamente.");
            navigate("/login");
            return;
        }

        // Eventualmente será substituído por um modal de confirmação mais elaborado
        const confirmDelete = window.confirm('Tem certeza que deseja excluir este artigo?');
        if (!confirmDelete) return;

        try {
            if (window.confirm('Tem certeza que deseja excluir este artigo?')) {
                const response = await fetch(`http://localhost:8080/posts/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                // 🔐 Auth
                if (response.status === 401) {
                    localStorage.removeItem("token");
                    alert("Sessão expirada. Faça login novamente.");
                    navigate("/login");
                    return;
                }

                // ❌ Outros erros
                if (!response.ok) {
                    const errorData = await response.json().catch(() => null);
                    throw new Error(errorData?.message || "Erro ao excluir artigo");
                }

                // ✅ Sucesso
                let message = "Artigo excluído com sucesso!";
                onDeleteSuccess(); // Notifica o componente pai para atualizar a lista

                if (response.status !== 204) {
                    const data = await response.json();
                    message = data.message || message;
                }

                alert(message);
            }
        } catch (error) {
            console.error('Erro ao excluir artigo:', error);
            alert(error.message);
        }
    }

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
                        <button className={estilo['article-button-edit']} onClick={handleEditClick}>Editar</button>
                        <button className={estilo['article-button-delete']} onClick={handleDeleteClick}>Excluir</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
