import estilo from './HomePage.module.css';
import MetricCard from "../../components/MetricCard/MetricCard";
import TableRow from '../../components/TableRow/TableRow';

export default function HomePage() {
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
        <MetricCard title="Artigos Publicados" value="123" />
        <MetricCard title="Artigos em Rascunho" value="456" />
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
              <TableRow titulo="Como cuidar de plantas suculentas" categoria="Jardinagem" date="2024-06-01" status="Publicado" />
              <TableRow titulo="10 dicas para uma alimentação saudável" categoria="Saúde" date="2024-05-28" status="Publicado" />
              <TableRow titulo="Guia completo de viagens para a Europa" categoria="Viagens" date="2024-05-20" status="Rascunho" />
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
