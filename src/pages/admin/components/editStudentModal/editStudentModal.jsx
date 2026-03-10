import { useState, useEffect } from 'react'
import styles from './editStudentModal.module.css'
import Button from '../../../../components/button/button'
import TextInput from '../../../../components/textInput/textInput'
import { editStudent } from '../../../../api/services/adminService'

function EditStudentModal({ isOpen, onClose, student, onSuccess }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (isOpen && student) {
            setName(student.name ?? "")
            setEmail(student.email ?? "")
            setPassword("")
        }
    }, [isOpen, student])

    async function handleSubmit(e) {
        e.preventDefault()
        await editStudent(student.enrollment, name, email, password)
        onSuccess?.()
        onClose()
    }

    if (!isOpen || !student) return null

    return (
        <div className={styles.overlay} onClick={onClose}>
            <form
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
            >
                <h3>Editar Aluno</h3>

                <div className={styles.fields}>
                    <TextInput
                        placeholder="Nome Completo do Aluno"
                        value={name}
                        onChange={setName}
                        size="md"
                    />

                    <TextInput
                        placeholder="Senha"
                        value={password}
                        onChange={setPassword}
                        size="md"
                    />

                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChange={setEmail}
                        size="md"
                    />

                    <TextInput
                        placeholder="CPF"
                        value={student.cpf ?? ""}
                        size="md"
                        disabled
                    />
                </div>

                <Button content="Finalizar Edição" type="submit" size="md"/>
            </form>
        </div>
    )
}

export default EditStudentModal