import styles from "./header.module.css"

function Header() {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <img src="/odetto-logo-white.svg"/>
                    <h3 className={styles.logoText}>Odetto</h3>
                </div>

                <div className={styles.right}>
                    <h3 className={styles.username}>Lucas Grassas</h3>
                    <h4 className={styles.userEnrollment}>1984</h4>
                </div>
            </div>
        </>
    )
}

export default Header