import styles from './signIn.module.css'
import TextInput from '../../components/textInput/textInput'
import Button from '../../components/button/button'
import { useState } from 'react'

function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    return (
        <section className={styles.bg}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <img src="/odetto-logo-black.svg" alt="logo"/>
                    <h1>Login</h1>
                </div>

                <form className={styles.form}>
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

                    <div className={styles.actions}>
                        <div className={styles.buttons}>
                            <Button
                                content='Fazer Login'
                                type='submit'
                            />

                            <Button
                                content='Cadastro'
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