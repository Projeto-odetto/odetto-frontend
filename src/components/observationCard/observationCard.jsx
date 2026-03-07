import styles from "./observationCard.module.css"

function ObservationCard(observation) {
    return (
        <div className={`
            ${styles.card}
            ${observation.small ? styles.sm : ""}
        `}>
            <h3 className={styles.subject}>{observation.subject}</h3>
            <h4 className={styles.author}>{observation.teacherName}</h4>
            <p className={styles.observation}>{observation.observation}</p>
        </div>
    )
}

export default ObservationCard