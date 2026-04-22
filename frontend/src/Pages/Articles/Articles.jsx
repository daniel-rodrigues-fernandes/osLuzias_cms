import estilo from './Articles.module.css';
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import ArticleCard from '../../components/ArticleCard/ArticleCard';

export default function Articles() {

  const artigos = useLoaderData()
  const aviso = <p className={estilo['mensagem']}>Nenhum artigo encontrado.</p>

  const navigation = useNavigation()
  const navigate = useNavigate()
  const isLoading = navigation.state === 'loading'

  return (
    <main className={estilo['main']}>
      <header className={estilo['header']}>
        <h1 className={estilo['header-title']}>Meus Artigos</h1>
        <div>
          <button className={estilo['header-button-new']} onClick={() => navigate('/novo-artigo')}>Novo artigo</button>
        </div>
      </header>
      <div className={estilo['articles']}>
        {isLoading ? (
          <div className={estilo['loader']}>
            <span className={estilo['spinner']}></span>
            <p className={estilo['mensagem']}>Carregando artigos...</p>
          </div>
        ) : (artigos.length > 0 ? artigos.map(artigo => (
            <ArticleCard
              key={artigo.id}
              categoria={artigo.categoria}
              status={artigo.status}
              titulo={artigo.titulo}
              resumo={artigo.resumo}
              data={artigo.data}
              leitura={artigo.leitura}
              views={artigo.views}
              shares={artigo.shares}
            />
        )) : aviso)}
          </div>

    </main>
  )
}