import api from "../config"

export async function getStudents(subject) {
    const response = await api.get(
        `/student/find-students-by-subject/${subject}`
    )

    return response
}

export async function getGrades(subscription) {
    const response = await api.get(
        `/grades/find-grades-by-enrollment/${subscription}`
    )

    return response
}