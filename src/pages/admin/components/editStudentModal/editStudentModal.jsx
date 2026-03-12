import { useState, useEffect } from 'react'
import styles from './editStudentModal.module.css'
import Button from '../../../../components/button/button'
import TextInput from '../../../../components/textInput/textInput'
import { editStudent, editStudentSubjects } from '../../../../api/services/adminService'

function EditStudentModal({ isOpen, onClose, student, onSuccess }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [addedSubjects, setAddedSubjects] = useState("")
    const [removedSubjects, setRemovedSubjects] = useState("")

    useEffect(() => {
        if (isOpen && student) {
            setName(student.name ?? "")
            setEmail(student.email ?? "")
            setPassword("")
            setAddedSubjects("")
            setRemovedSubjects("")
        }
    }, [isOpen, student])

    async function handleSubmit(e) {
        e.preventDefault()
        await editStudent(student.enrollment, name, email, password)

        const added = addedSubjects.split(",").map(s => s.trim()).filter(s => s)
        const removed = removedSubjects.split(",").map(s => s.trim()).filter(s => s)
        if (added.length > 0 || removed.length > 0) {
            await editStudentSubjects(student.enrollment, added, removed)
        }

        onSuccess?.()
        onClose()
    }

    if (!isOpen || !student) return null

    return (
        <div className={styles.overlay} onClick={onClose}>
            <form className={styles.modal} onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
                <h3>Editar Aluno</h3>
                <div className={styles.fields}>
                    <TextInput placeholder="Nome" value={name} onChange={setName} size="md"/>
                    <TextInput placeholder="Senha" value={password} onChange={setPassword} size="md"/>
                    <TextInput placeholder="Email" value={email} onChange={setEmail} size="md"/>
                    <TextInput placeholder="CPF" value={student.cpf ?? ""} size="md" disabled/>
                </div>
                <TextInput placeholder="Adicionar matérias (separadas por vírgula)" value={addedSubjects} onChange={setAddedSubjects} size="xlg"/>
                <TextInput placeholder="Remover matérias (separadas por vírgula)" value={removedSubjects} onChange={setRemovedSubjects} size="xlg"/>
                <Button content="Finalizar Edição" type="submit" size="md"/>
            </form>
        </div>
    )
}

export default EditStudentModal