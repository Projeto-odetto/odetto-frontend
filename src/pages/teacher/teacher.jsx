import { useState } from 'react'
import TextInput from '../../components/textInput/textInput'
import styles from './teacher.module.css'
import Button from '../../components/button/button'
import StudentListItem from './components/studentListItem/studentListItem'

function Teacher({students}) {
    const [studentSubscription, setStudentSubscription] = useState("")
    const filteredStudents = students.filter((student) =>
        student.subscription
            .toString()
            .startsWith(studentSubscription)
    )

    return (
        <>
            <h1 className={styles.pageTitle}>Seus Alunos</h1>

            <div className={styles.students}>
                <div className={styles.actions}>
                    <TextInput
                        placeholder='Pesquise seus alunos pela matrícula'
                        value={studentSubscription}
                        onChange={setStudentSubscription}
                        size='lg'
                    />

                    <Button content="Atribuir Notas"/>
                </div>

                <div className={styles.studentsList}>
                    {filteredStudents.map((student) => (
                        <StudentListItem key={student.subscription} {...student}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Teacher