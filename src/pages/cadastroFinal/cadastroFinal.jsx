import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import styles from './cadastroFinal.module.css'
import TextInput from '../../components/textInput/textInput'
import Button from '../../components/button/button'
import api from '../../api/config'

function CadastroFinal() {
    const { user, loginUser } = useAuth()
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        await api.patch("/student/cadastro-final", {
            enrollment: user.enrollment,
            name,
            password
        })
        navigate("/student")
    }

    return (
        <section className={styles.bg}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <img src="/odetto-logo-black.svg" alt="logo"/>
                    <h1>Primeiro Acesso</h1>
                    <p>Complete seu cadastro para continuar.</p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <TextInput
                        placeholder="Nome Completo"
                        value={name}
                        onChange={setName}
                        size="xlg"
                    />
                    <TextInput
                        placeholder="Nova Senha"
                        value={password}
                        onChange={setPassword}
                        size="xlg"
                    />
                    <Button content="Finalizar Cadastro" type="submit" size="lg"/>
                </form>
            </div>
        </section>
    )
}

export default CadastroFinal