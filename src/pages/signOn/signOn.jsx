import styles from './signOn.module.css'
import TextInput from '../../components/textInput/textInput'
import Button from '../../components/button/button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import api from '../../api/config'

function SignOn() {
    const navigate = useNavigate()
    const { user } = useAuth()

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()

        if (password !== confirmPassword) {
            console.error("Senhas não coincidem")
            return
        }

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
                    <h1>Cadastro</h1>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <TextInput
                        placeholder='Nome Completo'
                        value={name}
                        onChange={setName}
                        size='xlg'
                    />

                    <TextInput
                        placeholder='Senha'
                        value={password}
                        onChange={setPassword}
                        size='xlg'
                    />
                    
                    <TextInput
                        placeholder='Confirmar Senha'
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        size='xlg'
                    />

                    <div className={styles.actions}>
                        <div className={styles.buttons}>
                            <Button
                                content='Voltar'
                                onClick={() => navigate('/sign-in')}
                            />
                            <Button
                                content='Fazer Cadastro'
                                type='submit'
                            />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default SignOn