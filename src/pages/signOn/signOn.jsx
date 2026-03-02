import styles from './signOn.module.css'
import TextInput from '../../components/textInput/textInput'
import Button from '../../components/button/button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignOn() {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [subscription, setSubscription] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    return (
        <section className={styles.bg}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <img src="/odetto-logo-black.svg" alt="logo"/>
                    <h1>Cadastro</h1>
                </div>

                <form className={styles.form}>
                    <TextInput
                        placeholder='Nome Completo'
                        value={name}
                        onChange={setName}
                        size='xlg'
                    />

                    <TextInput
                        placeholder='Matrícula'
                        value={subscription}
                        onChange={setSubscription}
                        size='xlg'
                    />

                    <TextInput
                        placeholder='E-mail'
                        value={email}
                        onChange={setEmail}
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
                                content='Login'
                                onClick={() => {navigate('/sign-in')}}
                            />

                            <Button
                                content='Fazer Cadastro'
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

export default SignOn