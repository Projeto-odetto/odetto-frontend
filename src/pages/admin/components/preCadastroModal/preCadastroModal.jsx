import { useState, useEffect } from 'react'
import styles from './preCadastroModal.module.css'
import Button from '../../../../components/button/button'
import TextInput from '../../../../components/textInput/textInput'
import { preCadastro } from '../../../../api/services/adminService'

function PreCadastroModal({ isOpen, onClose, onSuccess }) {
    const [cpf, setCpf] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        if (isOpen) {
            setCpf("")
            setEmail("")
        }
    }, [isOpen])

    async function handleSubmit(e) {
        e.preventDefault()
        await preCadastro(cpf, email)
        onSuccess?.()
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className={styles.overlay} onClick={onClose}>
            <form
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
            >
                <h3>Realizar Pré-Cadastro</h3>

                <TextInput
                    placeholder="CPF"
                    value={cpf}
                    onChange={setCpf}
                    size="xlg"
                />

                <TextInput
                    placeholder="E-mail"
                    value={email}
                    onChange={setEmail}
                    size="xlg"
                />

                <Button content="Fazer Cadastro" type="submit" size="md"/>
            </form>
        </div>
    )
}

export default PreCadastroModal