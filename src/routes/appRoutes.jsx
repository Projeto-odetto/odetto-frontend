import { Navigate, Route, Routes } from "react-router-dom"
import SignIn from "../pages/signIn/signIn"
import SignOn from "../pages/signOn/signOn"
import Teacher from "../pages/teacher/teacher"
import { studentsMock } from "../mocks/students.mock"
import { observationsMock } from "../mocks/observations.mock"
import Student from "../pages/student/student"

export function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/sign-in'/>}/>
            <Route path='/sign-in' element={<SignIn/>}/>
            <Route path='/sign-on' element={<SignOn/>}/>
            <Route path='/teacher' element={<Teacher students={studentsMock}/>}/>
            <Route path='/student' element={<Student observations={observationsMock} gradesData={[
                {
                    subject: "Mobile",
                    teacher: "Nisflei",
                    grades: [10, 7, 8.5],
                    mean: 8.5
                },
                {
                    subject: "Mobile",
                    teacher: "Nisflei",
                    grades: [10, 7, 8.5],
                    mean: 8.5
                },
                {
                    subject: "Mobile",
                    teacher: "Nisflei",
                    grades: [10, 7, 8.5],
                    mean: 8.5
                },
                {
                    subject: "Mobile",
                    teacher: "Nisflei",
                    grades: [10, 7, 8.5],
                    mean: 8.5
                },
                {
                    subject: "Mobile",
                    teacher: "Nisflei",
                    grades: [10, 7, 8.5],
                    mean: 8.5
                },
                {
                    subject: "Mobile",
                    teacher: "Nisflei",
                    grades: [10, 7, 8.5],
                    mean: 8.5
                },
                {
                    subject: "Mobile",
                    teacher: "Nisflei",
                    grades: [10, 7, 8.5],
                    mean: 8.5
                },
                {
                    subject: "Mobile",
                    teacher: "Nisflei",
                    grades: [10, 7, 8.5],
                    mean: 8.5
                },
                {
                    subject: "Mobile",
                    teacher: "Nisflei",
                    grades: [10, 7, 8.5],
                    mean: 8.5
                },
                {
                    subject: "Mobile",
                    teacher: "Nisflei",
                    grades: [10, 7, 8.5],
                    mean: 8.5
                },
                {
                    subject: "Mobile",
                    teacher: "Nisflei",
                    grades: [10, 7, 8.5],
                    mean: 8.5
                },
                {
                    subject: "Mobile",
                    teacher: "Nisflei",
                    grades: [10, 7, 8.5],
                    mean: 8.5
                },
                {
                    subject: "Mobile",
                    teacher: "Nisflei",
                    grades: [10, 7, 8.5],
                    mean: 8.5
                },
                {
                    subject: "Mobile",
                    teacher: "Nisflei",
                    grades: [10, 7, 8.5],
                    mean: 8.5
                },
            ]}/>}/>
        </Routes>
    )
}