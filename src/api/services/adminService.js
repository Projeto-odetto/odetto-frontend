import api from "../config"

export async function adminLogin(email, password) {
    const response = await api.post("/admin/login", { email, password })
    return response.data
}

export async function preCadastro(cpf, email) {
    const response = await api.post("/admin/pre-cadastro", { cpf, email })
    return response.data
}

export async function editStudent(enrollment, name, email, password) {
    const response = await api.patch("/student/edit", { enrollment, name, email, password })
    return response.data
}

export async function deleteStudent(enrollment) {
    const response = await api.delete(`/student/delete/${enrollment}`)
    return response.data
}

export async function createTeacher(cpf, name, username, password, subjectNames) {
    const response = await api.post("/teacher/create", { cpf, name, username, password, subjectNames })
    return response.data
}

export async function editTeacher(cpf, name, username, password) {
    const response = await api.patch("/teacher/edit", { cpf, name, username, password })
    return response.data
}

export async function editTeacherSubjects(cpf, addedSubjects, removedSubjects) {
    const response = await api.patch("/teacher/edit-subjects", { cpf, addedSubjects, removedSubjects })
    return response.data
}

export async function deleteTeacher(cpf) {
    const response = await api.delete(`/teacher/delete/${cpf}`)
    return response.data
}

export async function editStudentSubjects(enrollment, addedSubjects, removedSubjects) {
    const response = await api.patch("/student/edit-subjects", { enrollment, addedSubjects, removedSubjects })
    return response.data
}