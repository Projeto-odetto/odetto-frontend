import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './adminSignIn.module.css'
import TextInput from '../../components/textInput/textInput'
import Button from '../../components/button/button'
import { adminLogin } from '../../api/services/adminService'

function AdminSignIn() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await adminLogin(email, password)
            localStorage.setItem("admin", JSON.stringify(response))
            navigate("/adminStudent")
        } catch (err) {
            console.error("Erro ao fazer login como admin: ", err)
        }
    }

    return (
        <section className={styles.bg}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <img src="/odetto-logo-black.svg" alt="logo"/>
                    <h1>Login Admin</h1>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <TextInput
                        placeholder="E-mail"
                        value={email}
                        onChange={setEmail}
                        size="xlg"
                    />
                    <TextInput
                        placeholder="Senha"
                        value={password}
                        onChange={setPassword}
                        size="xlg"
                    />
                    <div className={styles.actions}>
                        <Button content="Voltar" onClick={() => navigate("/sign-in")}/>
                        <Button content="Entrar" type="submit"/>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default AdminSignIn