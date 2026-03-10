import api from "../config"

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