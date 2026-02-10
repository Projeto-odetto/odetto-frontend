import styles from "./observationCard.module.css"

function ObservationCard({
    author,
    subject,
    observation,
    small = false
}) {
    return (
        <div className={`
            ${styles.card}
            ${small ? styles.sm : ""}
        `}>
            <h3 className={styles.subject}>{subject}</h3>
            <h4 className={styles.author}>{author}</h4>
            <p className={styles.observation}>{observation}</p>
        </div>
    )
}

export default ObservationCard