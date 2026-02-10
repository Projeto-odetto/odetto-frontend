import styles from "./iconButton.module.css"

function IconButton({
    icon,
    alt,
    variant,
    disabled = false,
    onClick
}) {
    return (
        <button className={`
            ${styles.iconButton}
            ${variant ? styles[variant] : ""}
            ${disabled ? styles.disabled : ""}
        `}
            disabled={disabled}
            onClick={onClick}
        >
            <img className={styles.icon}
                src={icon}
                alt={alt}
            />
        </button>
    )
}

export default IconButton