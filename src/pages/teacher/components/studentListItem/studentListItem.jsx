import styles from './studentListItem.module.css'
import IconButton from '../../../../components/iconButton/iconButton'

function StudentListItem(student) {
    return (
        <div
            className={styles.listItem}
        >
            <p className={styles.studentInfo}>{student.name} | {student.subscription}</p>

            <IconButton icon='odetto-logo.svg'/>
        </div>
    )
}

export default StudentListItem