import { useState, useEffect } from 'react'
import styles from './editTeacherModal.module.css'
import Button from '../../../../components/button/button'
import TextInput from '../../../../components/textInput/textInput'
import { editTeacher, editTeacherSubjects, deleteTeacher } from '../../../../api/services/adminService'

function EditTeacherModal({ isOpen, onClose, teacher, onSuccess }) {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [addedSubjects, setAddedSubjects] = useState("")
    const [removedSubjects, setRemovedSubjects] = useState("")

    useEffect(() => {
        if (isOpen && teacher) {
            setName(teacher.name ?? "")
            setUsername(teacher.username ?? "")
            setPassword("")
            setAddedSubjects("")
            setRemovedSubjects("")
        }
    }, [isOpen, teacher])

    async function handleSubmit(e) {
        e.preventDefault()
        await editTeacher(teacher.cpf, name, username, password)

        const added = addedSubjects.split(",").map(s => s.trim()).filter(s => s)
        const removed = removedSubjects.split(",").map(s => s.trim()).filter(s => s)
        if (added.length > 0 || removed.length > 0) {
            await editTeacherSubjects(teacher.cpf, added, removed)
        }

        onSuccess?.()
        onClose()
    }

    async function handleDelete() {
        await deleteTeacher(teacher.cpf)
        onSuccess?.()
        onClose()
    }

    if (!isOpen || !teacher) return null

    return (
        <div className={styles.overlay} onClick={onClose}>
            <form className={styles.modal} onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
                <h3>Editar Professor</h3>
                <div className={styles.fields}>
                    <TextInput placeholder="Nome" value={name} onChange={setName} size="md"/>
                    <TextInput placeholder="Username" value={username} onChange={setUsername} size="md"/>
                    <TextInput placeholder="Nova Senha" value={password} onChange={setPassword} size="md"/>
                    <TextInput placeholder="CPF" value={teacher.cpf ?? ""} size="md" disabled/>
                </div>
                <TextInput placeholder="Adicionar matérias (separadas por vírgula)" value={addedSubjects} onChange={setAddedSubjects} size="xlg"/>
                <TextInput placeholder="Remover matérias (separadas por vírgula)" value={removedSubjects} onChange={setRemovedSubjects} size="xlg"/>
                <div className={styles.actions}>
                    <Button content="Deletar" variant="error" onClick={handleDelete}/>
                    <Button content="Salvar" type="submit"/>
                </div>
            </form>
        </div>
    )
}

export default EditTeacherModal