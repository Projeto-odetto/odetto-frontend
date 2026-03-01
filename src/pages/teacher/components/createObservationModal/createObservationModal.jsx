import { useState } from 'react'
import Button from '../../../../components/button/button'
import InputMultiline from '../../../../components/inputMultiline/inputMultiline'
import styles from './createObservationModal.module.css'

function CreateObservationModal({
    isOpen = false,
    onClose,
    onSend
}) {
    const [observation, setObservation] = useState("")

    function cancelObservation() {
        setObservation("")
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className={`
            ${styles.overlay}
            ${isOpen ? "" : styles.closed}
        `}
            onClick={onClose}
        >
            <div
                className={styles.modal}
                onClick={(e) => {e.stopPropagation()}}
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
                        onClick={() => cancelObservation()}
                    />

                    <Button
                        content="Enviar"
                        onClick={() => onSend(observation)}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateObservationModal