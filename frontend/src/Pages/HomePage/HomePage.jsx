import estilo from './HomePage.module.css';
import MetricCard from "../../components/MetricCard/MetricCard";
import TableRow from '../../components/TableRow/TableRow';

import { useLoaderData } from 'react-router-dom';

export default function HomePage() {

  const metricasArtigos = useLoaderData()
  console.log(metricasArtigos)

  return (
    <main className={estilo['main']}>
      <header className={estilo['header']}>
        <div className={estilo['header-info']}>
          <h1>Dashboard</h1>
          <span>Seja bem-vindo, {localStorage.getItem("username") || "usuário"}, ao painel administrativo do blog Os Luzias.</span>
        </div>
        <div className={estilo['header-user']}>
          <div className={estilo['header-user__img']}></div>
          <div className={estilo['header-user__info']}>
            <p>{localStorage.getItem("username") || "usuário"}</p>
            <p>Autor</p>
          </div>
        </div>
      </header>

      <section className={estilo['metrics']}>
        <MetricCard title="Artigos Publicados" value={metricasArtigos[0].total_publicados} />
        <MetricCard title="Artigos em Rascunho" value={metricasArtigos[0].total_rascunhos} />
        <MetricCard title="Tempo de Leitura Médio" value="789" />
      </section>

      <section className={estilo['table-container']}>
        <h3 className={estilo['table-title']}>Artigos Recentes</h3>
        <div>
          <table className={estilo['table']}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Categoria</th>
                <th>Data de Publicação</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {metricasArtigos.slice(1).map(artigo => (
                <TableRow
                  key={artigo.idPost}
                  titulo={artigo.titulo}
                  date={artigo.publicado_em ? new Date(artigo.publicado_em).toLocaleDateString('pt-BR') : "Não publicado"}
                  status={(artigo.status).charAt(0).toUpperCase() + artigo.status.slice(1)}
                  categoria={artigo.categoriaNome ? artigo.categoriaNome : "-"}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
