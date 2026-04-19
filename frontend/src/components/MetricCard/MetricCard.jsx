import estilo from "./MetricCard.module.css";

export default function MetricCard({ title, value }) {
  return (
    <div className={estilo['metric-card']}>
        <p className={estilo['metric-title']}>{title}</p>
        <p className={estilo['metric-value']}>{value}</p>
    </div>
  )
}
