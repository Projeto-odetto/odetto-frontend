import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/authContext"

export default function ProtectedRoute({ children, type }) {
    const { user, loading } = useAuth()

    if (loading) return null

    if (!user) {
        return <Navigate to="/sign-in" replace />
    }

    const isStudent = !!user.enrollment
    const isTeacher = !!user.selectedSubject

    if (type === "student" && !isStudent) {
        return <Navigate to="/teacher" replace />
    }

    if (type === "teacher" && !isTeacher) {
        return <Navigate to="/student" replace />
    }

    return children
}