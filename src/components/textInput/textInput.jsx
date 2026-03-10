import styles from "./textInput.module.css"

function TextInput({
    value,
    placeholder = "Insira o texto...",
    size = "sm",
    onChange,
    disabled = false
}) {
    return (
        <input className={`
            ${styles.input}
            ${styles[size]}
            ${disabled ? styles.disabled : ""}
        `}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
        >
        </input>
    )
}

export default TextInput