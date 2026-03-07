import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/authContext"

export function useProtectedRoute() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate("/sign-in")
    }
  }, [user, loading, navigate])
}