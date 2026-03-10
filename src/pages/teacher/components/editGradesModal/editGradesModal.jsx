import { useEffect, useState } from "react"
import Dropdown from "../../../../components/dropdown/dropdown"
import styles from "./editGradesModal.module.css"
import Button from '../../../../components/button/button'
import TextInput from "../../../../components/textInput/textInput"
import { editGrade } from "../../../../api/services/studentService"
import { useAuth } from "../../../../contexts/authContext"

function EditGradesModal({
    isOpen = false,
    onClose,
    student
}) {
    const { user } = useAuth()

    const [selectedGrade, setSelectedGrade] = useState(null)
    const [newGradeValue, setNewGradeValue] = useState(0)

    useEffect(() => {
        if (isOpen) {
            setSelectedGrade(null)
            setNewGradeValue(0)
        }
    }, [isOpen])

    useEffect(() => {
        if (selectedGrade !== null) {
            setNewGradeValue(student.gradesData.grades[selectedGrade])
        }
    }, [selectedGrade, student])

    async function editStudentGrade(e) {
        e.preventDefault()
        onClose()

        await editGrade(student.name, user.selectedSubject, selectedGrade, newGradeValue)
    }

    if (!isOpen || !student) return null

    return (
        <div className={`
            ${styles.overlay}
            ${isOpen ? "" : styles.closed}
        `}
            onClick={onClose}
        >
            <form
                className={styles.modal}
                onClick={(e) => {e.stopPropagation()}}
                onSubmit={(e) => editStudentGrade(e)}
            >
                <h3>Editar Nota</h3>

                <div className={styles.content}>
                    <div>
                        <h4>Nota Selecionada:</h4>
                        
                        <Dropdown
                            placeholder="Selecione a nota..."
                            size="md"
                            value={selectedGrade}
                            onChange={setSelectedGrade}
                            options={student.gradesData !== undefined ?
                                student.gradesData.grades.map((_, i) => {
                                    return {value: i, label: `Nota ${i + 1}`}
                                }) : []
                            }
                        />
                    </div>

                    <div>
                        <h4>Valor da Nota:</h4>

                        <TextInput
                            placeholder="Digite o novo valor..."
                            size="md"
                            value={newGradeValue}
                            onChange={setNewGradeValue}
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
                        content="Enviar"
                        type="submit"
                    />
                </div>
            </form>
        </div>
    )
}

export default EditGradesModal