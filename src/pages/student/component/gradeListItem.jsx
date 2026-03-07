import styles from './gradeListItem.module.css'

function GradeListItem({
    index = 2,
    subjectName,
    teacherName,
    grades,
    average
}) {
    return (
        <div className={`
            ${styles.listItem}
            ${index % 2 === 0 ? styles.white : styles.blue}
        `}>
            <p className={styles.subject}>
                {subjectName}
            </p>

            <p className={styles.teacher}>
                {teacherName}
            </p>

            <div className={styles.grades}>
                {grades.map((grade) => (
                    <p>{grade.toFixed(1)}</p>
                ))}
            </div>

            <p className={styles.mean}>
                {average}
            </p>
        </div>
    )
}

export default GradeListItem