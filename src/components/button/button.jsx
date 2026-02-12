import styles from "./button.module.css"

function Button({
    content,
    variant,
    size = "sm",
    type = "button",
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
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {content.toUpperCase()}
        </button>
    )
}

export default Button