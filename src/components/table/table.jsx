import styles from "./table.module.css";

function Table({ columns, values, titles }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{titles[index]}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {values.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => (
                <td key={colIndex}>
                    {Array.isArray(row[col])
                    ? row[col].join(", ")
                    : col.toLowerCase().includes("date")
                    ? new Date(row[col]).toLocaleDateString()
                    : row[col]}
                </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}


export default Table;