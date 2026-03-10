import { useState, useRef, useEffect } from "react"
import styles from "./dropdown.module.css"
import dropdownArrow from "../../assets/icons/dropdown-arrow.svg"

function Dropdown({
    value,
    options = [],
    placeholder = "Selecione...",
    size = "sm",
    onChange
}) {

    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    const selectedOption = options.find(opt => opt.value === value)

    const handleSelect = (option) => {
        onChange?.(option.value)
        setIsOpen(false)
    }

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div
            className={`${styles.dropdown} ${styles[size]}`}
            ref={dropdownRef}
        >

            <div
                className={styles.input}
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedOption?.label || placeholder}

                <img src={dropdownArrow}/>
            </div>

            {isOpen && (
                <div className={styles.menu}>
                    {options.map(option => (
                        <div
                            key={option.value}
                            className={styles.option}
                            onClick={() => handleSelect(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default Dropdown