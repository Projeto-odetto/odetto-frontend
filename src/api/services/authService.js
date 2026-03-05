import api from "../config";

export async function login(cpf, password) {
    const response = await api.post(
        "/auth/login",
        {
            cpf,
            password
        }
    )

    return response.data
}