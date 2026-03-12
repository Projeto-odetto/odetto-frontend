import { useState, useEffect } from "react"
import styles from "./assignGradesModal.module.css"
import Button from "../../../../components/button/button"
import TextInput from "../../../../components/textInput/textInput"
import Dropdown from "../../../../components/dropdown/dropdown"
import { useAuth } from "../../../../contexts/authContext"
import { insertGrade } from "../../../../api/services/studentService"

function AssignGradesModal({ isOpen = false, onClose, students = [] }) {
    const { user } = useAuth()
    const [selectedEnrollment, setSelectedEnrollment] = useState(null)
    const [gradeValue, setGradeValue] = useState("")

    useEffect(() => {
        if (isOpen) {
            setSelectedEnrollment(null)
            setGradeValue("")
        }
    }, [isOpen])

    async function handleSubmit(e) {
        e.preventDefault()
        const student = students.find(s => s.enrollment === selectedEnrollment)
        if (!student) return

        await insertGrade(
            student.name,
            user.selectedSubject,
            Number(gradeValue) > 10 ? 10 : Number(gradeValue)
        )

        setGradeValue("")
        setSelectedEnrollment(null)
    }

    if (!isOpen || students.length === 0) return null

    return (
        <div className={styles.overlay} onClick={onClose}>
            <form className={styles.modal} onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
                <h3>Atribuir Nota</h3>

                <div className={styles.content}>
                    <div>
                        <h4>Aluno:</h4>
                        <Dropdown
                            placeholder="Selecione o aluno..."
                            size="md"
                            value={selectedEnrollment}
                            onChange={setSelectedEnrollment}
                            options={students.map(s => ({
                                value: s.enrollment,
                                label: `${s.name} (${s.enrollment})`
                            }))}
                        />
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
                    <Button content="Cancelar" variant="error" onClick={onClose}/>
                    <Button content="Atribuir" type="submit" disabled={!selectedEnrollment || !gradeValue}/>
                </div>
            </form>
        </div>
    )
}

export default AssignGradesModal