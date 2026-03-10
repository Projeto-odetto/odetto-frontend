import { useEffect, useState } from "react"
import styles from "./assignGradesModal.module.css"
import Button from "../../../../components/button/button"
import TextInput from "../../../../components/textInput/textInput"
import { useAuth } from "../../../../contexts/authContext"
import { insertGrade } from "../../../../api/services/studentService"

function AssignGradesModal({
    isOpen = false,
    onClose,
    students = []
}) {
    const { user } = useAuth()

    const [currentIndex, setCurrentIndex] = useState(0)
    const [gradeValue, setGradeValue] = useState("")
    const [gradesList, setGradesList] = useState([])

    const currentStudent = students[currentIndex]

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(0)
            setGradeValue("")
            setGradesList([])
        }
    }, [isOpen])

    async function submitGrade(e) {
        e.preventDefault()

        const gradeDocument = {
            studentName: currentStudent.name,
            subjectName: user.selectedSubject,
            gradeValue: Number(gradeValue) > 10 ? 10 : Number(gradeValue)
        }

        console.log(gradeDocument)

        const updatedGrades = [...gradesList, gradeDocument]
        setGradesList(updatedGrades)

        const isLastStudent = currentIndex === students.length - 1

        if (!isLastStudent) {
            setCurrentIndex(prev => prev + 1)
            setGradeValue("")
            return
        }

        for (const grade of updatedGrades) {
            await insertGrade(
                grade.studentName,
                grade.subjectName,
                grade.gradeValue
            )
        }

        onClose()
    }

    if (!isOpen || students.length === 0) return null

    return (
        <div
            className={`${styles.overlay} ${isOpen ? "" : styles.closed}`}
            onClick={onClose}
        >
            <form
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
                onSubmit={submitGrade}
            >

                <h3>Atribuir Notas</h3>

                <div className={styles.content}>

                    <div>
                        <h4>Aluno:</h4>
                        <h4>{currentStudent.name} ({currentStudent.enrollment})</h4>
                    </div>

                    <div>
                        <h4>Nota:</h4>

                        <TextInput
                            placeholder="Digite a nota..."
                            size="md"
                            value={gradeValue}
                            onChange={setGradeValue}
                        />
                    </div>

                </div>

                <div className={styles.actions}>

                    <Button
                        content="Cancelar"
                        variant="error"
                        onClick={onClose}
                    />

                    <Button
                        content={
                            currentIndex === students.length - 1
                                ? "Finalizar"
                                : "Próximo"
                        }
                        type="submit"
                    />

                </div>

            </form>
        </div>
    )
}

export default AssignGradesModal