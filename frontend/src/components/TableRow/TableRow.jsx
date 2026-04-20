import estilo from './TableRow.module.css';

export default function TableRow({titulo, categoria, date, status}) {
  return (
    <tr className={estilo['table-row']}>
      <td>{titulo}</td>
      <td>{categoria}</td>
      <td>{date}</td>
      <td>{status}</td>
    </tr>
  )
}
