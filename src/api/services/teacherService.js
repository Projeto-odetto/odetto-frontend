import api from "../config"

export async function getListTeachers() {
    const response = await api.get(
        `/teacher/list-teachers`
    )

    return response.data
}