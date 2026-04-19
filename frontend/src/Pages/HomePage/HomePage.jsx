import estilo from './HomePage.module.css';
import MetricCard from "../../components/MetricCard/MetricCard";

export default function HomePage() {
  return (
    <main className={estilo['main']}>
      <header className={estilo['header']}>
        <div>
          <h1>Dashboard</h1>
          <span>Seja bem-vindo, {localStorage.getItem("username") || "usuário"}, ao painel administrativo do blog Os Luzias.</span>
        </div>
      </header>

      <section className={estilo['metrics']}>
        <MetricCard title="Total de Posts" value="123" />
        <MetricCard title="Total de Comentários" value="456" />
        <MetricCard title="Total de Usuários" value="789" />
      </section>
    </main>
  )
}
