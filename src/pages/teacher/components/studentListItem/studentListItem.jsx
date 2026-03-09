import styles from './studentListItem.module.css'
import IconButton from '../../../../components/iconButton/iconButton'
import pen from '../../../../assets/icons/pen.svg'

function StudentListItem({
    student,
    onClickButton
}) {
    return (
        <div
            className={styles.listItem}
        >
            <p className={styles.studentInfo}>{student.name} | {student.enrollment}</p>

            <IconButton icon={pen} onClick={onClickButton}/>
        </div>
    )
}

export default StudentListItem