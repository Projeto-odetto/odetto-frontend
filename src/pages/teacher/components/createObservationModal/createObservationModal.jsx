import { useEffect, useState } from 'react'
import Button from '../../../../components/button/button'
import InputMultiline from '../../../../components/inputMultiline/inputMultiline'
import styles from './createObservationModal.module.css'
import { useAuth } from '../../../../contexts/authContext'
import { createObservation } from '../../../../api/services/studentService'

function CreateObservationModal({
    isOpen = false,
    onClose,
    student
}) {
    const { user } = useAuth()

    const [observation, setObservation] = useState("")

    useEffect(() => {
        if (isOpen) {
            setObservation("")
        }
    }, [isOpen])

    async function createStudentObservation(e) {
        e.preventDefault()
        onClose()

        await createObservation(student.name, user.name, user.selectedSubject, observation)
    }

    if (!isOpen) return null

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
                onSubmit={(e) => createStudentObservation(e)}
            >
                <h3>Escrever Observação</h3>

                <InputMultiline
                    placeholder="Escreva Aqui..."
                    rows={6}
                    value={observation}
                    onChange={setObservation}
                />

                <div className={styles.actions}>
                    <Button
                        content="Cancelar"
                        variant="error"
                        onClick={onClose}
                    />

                    <Button
                        content="Enviar"
                        type='submit'
                    />
                </div>
            </form>
        </div>
    )
}

export default CreateObservationModal