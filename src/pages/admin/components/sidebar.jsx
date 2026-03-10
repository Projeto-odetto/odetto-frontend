import styles from './sidebar.module.css'
import { NavLink } from 'react-router-dom'

function SidebarAdmin() {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Admin</h2>

      <nav className={styles.menu}>
        <NavLink 
          to="/adminStudent" 
          className={({isActive}) => 
            isActive ? styles.activeLink : styles.link
          }
        >
          Alunos
        </NavLink>

        <NavLink 
          to="/adminTeacher" 
          className={({isActive}) => 
            isActive ? styles.activeLink : styles.link
          }
        >
          Professores
        </NavLink>
      </nav>
    </aside>
  )
}

export default SidebarAdmin