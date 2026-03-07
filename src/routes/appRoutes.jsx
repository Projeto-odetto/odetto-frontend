import { Navigate, Route, Routes } from "react-router-dom"
import SignIn from "../pages/signIn/signIn"
import SignOn from "../pages/signOn/signOn"
import Teacher from "../pages/teacher/teacher"
import Student from "../pages/student/student"
import ProtectedRoute from "./protectedRoute"
import { studentsMock } from "../mocks/students.mock"
import { observationsMock } from "../mocks/observations.mock"

export function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/sign-in'/>}/>
            <Route path='/sign-in' element={<SignIn/>}/>
            <Route path='/sign-on' element={<SignOn/>}/>

            <Route
                path='/teacher'
                element={
                    <ProtectedRoute type="teacher">
                        <Teacher students={studentsMock}/>
                    </ProtectedRoute>
                }
            />

            <Route
                path='/student'
                element={
                    <ProtectedRoute type="student">
                        <Student observations={observationsMock}/>
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}