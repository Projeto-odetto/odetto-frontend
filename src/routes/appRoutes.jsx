import { Navigate, Route, Routes } from "react-router-dom"
import SignIn from "../pages/signIn/signIn"

export function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/sign-in'/>}/>
            <Route path='/sign-in' element={<SignIn/>}/>
        </Routes>
    )
}