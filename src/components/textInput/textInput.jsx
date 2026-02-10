import styles from "./textInput.module.css"

function TextInput({
    value,
    placeholder = "Insira o texto...",
    size = "sm",
    onChange
}) {
    return (
        <input className={`
            ${styles.input}
            ${styles[size]}
        `}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange?.(e.target.value)}
        >
        </input>
    )
}

export default TextInput