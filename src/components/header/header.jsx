import styles from "./header.module.css"
import { useAuth } from '../../contexts/authContext'
import { useState, useRef, useEffect } from "react"
import dropdownArrow from "../../assets/icons/header-dropdown-arrow.svg"

function Header({children}) {
    const { user, logout, setSelectedSubject } = useAuth()

    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    function handleSelect(subject) {
        setSelectedSubject(subject)
    }

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
                    {user.enrollment !== undefined ?
                        <h4 className={styles.userEnrollment}>{user.enrollment}</h4>
                        :
                        <div
                            className={styles.dropdown}
                            ref={dropdownRef}
                        >
                            <div
                                className={styles.input}
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {user.selectedSubject}

                                <img src={dropdownArrow}/>
                            </div>

                            {isOpen && (
                                <div className={styles.menu}>
                                    {user.subjects.map((subject) => (
                                        <div
                                            key={subject}
                                            className={styles.subjectOption}
                                            onClick={() => handleSelect(subject)}
                                        >
                                            {subject}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    }
                </div>
            </div>

            {children}
        </>
    )
}

export default Header