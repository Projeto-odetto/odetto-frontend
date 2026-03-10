import { Navigate } from "react-router-dom"

export default function ProtectedAdminRoute({ children }) {
    const admin = localStorage.getItem("admin")

    if (!admin) {
        return <Navigate to="/admin-sign-in" replace />
    }

    return children
}