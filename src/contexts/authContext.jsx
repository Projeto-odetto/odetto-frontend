import { createContext, useContext, useState, useEffect } from "react";
import { login } from "../api/services/authService";

const AuthContext = createContext(undefined)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) setUser(JSON.parse(storedUser))
        setLoading(false)
    }, []);

    async function loginUser(cpf, password) {
        const loggedUser = await login(cpf, password)
        if (loggedUser.subjects) {
            loggedUser.selectedSubject = loggedUser.subjects[0]
        }

        setUser(loggedUser)
        localStorage.setItem("user", JSON.stringify(loggedUser))
    }

    function logout() {
        setUser(null)
        localStorage.removeItem("user")
    }

    return (
        <AuthContext.Provider value={{user, loading, loginUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider")
    return context
}