import styles from "./button.module.css"

function Button({
    content,
    variant,
    size = "sm"
}) {
    return (
        <div className={`
            ${styles.button}
            ${variant ? styles[variant] : ""}
            ${styles[size]}

        `}>
            <p className={styles.content}>{content}</p>
        </div>
    )
}

export default Button