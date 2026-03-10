import { useState, useEffect } from 'react'
import styles from './createTeacherModal.module.css'
import Button from '../../../../components/button/button'
import TextInput from '../../../../components/textInput/textInput'
import { createTeacher } from '../../../../api/services/adminService'

function CreateTeacherModal({ isOpen, onClose, onSuccess }) {
    const [cpf, setCpf] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [subjectNames, setSubjectNames] = useState("")

    useEffect(() => {
        if (isOpen) {
            setCpf(""); setName(""); setUsername(""); setPassword(""); setSubjectNames("")
        }
    }, [isOpen])

    async function handleSubmit(e) {
        e.preventDefault()
        const subjects = subjectNames.split(",").map(s => s.trim()).filter(s => s)
        await createTeacher(Number(cpf), name, username, password, subjects)
        onSuccess?.()
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className={styles.overlay} onClick={onClose}>
            <form className={styles.modal} onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
                <h3>Criar Professor</h3>
                <div className={styles.fields}>
                    <TextInput placeholder="CPF" value={cpf} onChange={setCpf} size="md"/>
                    <TextInput placeholder="Nome" value={name} onChange={setName} size="md"/>
                    <TextInput placeholder="Username" value={username} onChange={setUsername} size="md"/>
                    <TextInput placeholder="Senha" value={password} onChange={setPassword} size="md"/>
                </div>
                <TextInput placeholder="Matérias (separadas por vírgula)" value={subjectNames} onChange={setSubjectNames} size="xlg"/>
                <Button content="Criar Professor" type="submit" size="md"/>
            </form>
        </div>
    )
}

export default CreateTeacherModal