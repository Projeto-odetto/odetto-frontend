import styles from "./header.module.css"
import { useAuth } from '../../contexts/authContext'

function Header({children}) {
    const { user, logout } = useAuth()

    if (!user) return children

    return (
        <>
            <div className={styles.header}>
                <div
                    className={styles.left}
                    onClick={logout}
                >
                    <img src="/odetto-logo-white.svg"/>
                    <h3 className={styles.logoText}>Odetto</h3>
                </div>

                <div className={styles.right}>
                    <h3 className={styles.username}>{user.name}</h3>
                    <h4 className={styles.userEnrollment}>{user.enrollment === undefined ? user.subject : user.enrollment}</h4>
                </div>
            </div>

            {children}
        </>
    )
}

export default Header