import styles from "./button.module.css"

function Button({
    content,
    variant,
    size = "sm",
    disabled = false,
    onClick
}) {
    return (
        <button className={`
            ${styles.button}
            ${variant ? styles[variant] : ""}
            ${styles[size]}
            ${disabled ? styles.disabled : ""}
        `}
            disabled={disabled}
            onClick={onClick}
        >
            {content.toUpperCase()}
        </button>
    )
}

export default Button