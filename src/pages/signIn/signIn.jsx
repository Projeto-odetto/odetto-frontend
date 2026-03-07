import styles from './signIn.module.css'
import TextInput from '../../components/textInput/textInput'
import Button from '../../components/button/button'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

function SignIn() {
    const { user, loginUser } = useAuth()
    const navigate = useNavigate()

    const [cpf, setCpf] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (user) {
            if (user.enrollment !== undefined) {
                navigate("/student")
            }
            if (user.subject !== undefined) {
                navigate("/teacher")
            }
        }
    }, [user])

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            await loginUser(cpf, password)

            navigate("/student")
        } catch (err) {
            console.error("erro ao fazer login: ", err)
        }
    }

    return (
        <section className={styles.bg}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <img src="/odetto-logo-black.svg" alt="logo"/>
                    <h1>Login</h1>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <TextInput
                        placeholder='CPF'
                        value={cpf}
                        onChange={setCpf}
                        size='xlg'
                    />

                    <TextInput
                        placeholder='Senha'
                        value={password}
                        onChange={setPassword}
                        size='xlg'
                    />

                    <div className={styles.actions}>
                        <div className={styles.buttons}>
                            <Button
                                content='Cadastro'
                                onClick={() => {navigate("/sign-on")}}
                            />

                            <Button
                                content='Fazer Login'
                                type='submit'
                            />
                        </div>

                        <a href="" className={styles.userAdm}>Entrar como administrador</a>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default SignIn