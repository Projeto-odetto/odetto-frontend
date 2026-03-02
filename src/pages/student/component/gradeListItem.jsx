import styles from './gradeListItem.module.css'

function GradeListItem({
    index = 2,
    subject,
    teacher,
    grades,
    mean
}) {
    return (
        <div className={`
            ${styles.listItem}
            ${index % 2 === 0 ? styles.white : styles.blue}
        `}>
            <p className={styles.subject}>
                {subject}
            </p>

            <p className={styles.teacher}>
                {teacher}
            </p>

            <div className={styles.grades}>
                {grades.map((grade) => (
                    <p>{grade.toFixed(1)}</p>
                ))}
            </div>

            <p className={styles.mean}>
                {mean}
            </p>
        </div>
    )
}

export default GradeListItem