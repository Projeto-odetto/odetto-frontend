import styles from "./inputMultiline.module.css"

function InputMultiline({
    value,
    placeholder,
    onChange,
    rows = 4,
    readOnly = false
}) {
    return (
        <textarea className={styles.input}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange?.(e.target.value)}
            rows={rows}
            readOnly={readOnly}
        ></textarea>
    )
}

export default InputMultiline