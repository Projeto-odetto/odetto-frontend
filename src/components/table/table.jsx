import styles from "./table.module.css"
import IconButton from "../iconButton/iconButton"
import pen from "../../assets/icons/pen.svg"

function Table({ columns, values, titles, onEdit }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{titles[index]}</th>
          ))}
          {onEdit && <th></th>}
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
            {onEdit && (
              <td className={styles.actionCell}>
                <IconButton icon={pen} onClick={() => onEdit(row)}/>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table