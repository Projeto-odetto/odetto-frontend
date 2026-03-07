import styles from './student.module.css'
import Button from '../../components/button/button'
import ObservationCard from '../../components/observationCard/observationCard'
import GradeListItem from './component/gradeListItem'
import { useEffect, useState } from 'react'
import { getGrades, getObservationsStudent } from '../../api/services/studentService'
import { getGrades } from '../../api/services/studentService'
import { useProtectedRoute } from '../../hooks/useProtectedRoute'
import { useAuth } from '../../contexts/authContext'

function Student({
}) {
    useProtectedRoute()

    const { user, loading } = useAuth()

    const [gradesData,setGradesData] = useState([])
    const [observationsData, setObservationsData] = useState([])

    useEffect(() => {
        if (!user) return

        async function get(subscription) {
            const grades = await getGrades(subscription)
            setGradesData(grades)
        }

        get(user.enrollment)
    }, [user])

    useEffect(() => {
        async function get(subscription) {
            const observations = await getObservationsStudent(subscription)

            setObservationsData(observations)
        }

        get(2024001)
    })
 
    if(!gradesData) return null
    if (loading) return null
    if (!user) return null

    return (
        <section className={styles.content}>
            <div className={styles.reportCard}>
                <div className={styles.reportCardHeader}>
                    <h1 className={styles.reportCardTitle}>Boletim</h1>

                    <div className={styles.downloadButton}>
                        <Button content="Baixar Boletim"/>
                    </div>
                </div>

                <div className={styles.gradesHeader}>
                    <h4>Disciplina</h4>

                    <h4>Professor</h4>

                    <h4>Notas</h4>

                    <h4>Média</h4>
                </div>

                <div className={styles.grades}>
                    {gradesData.map((grade, i) => (
                        <GradeListItem {...grade} index={i}/>
                    ))}
                </div>
            </div>

            <div className={styles.observationsBox}>
                <h1 className={styles.observationsTitle}>Observações</h1>

                <div className={styles.observations}>
                    {observationsData.map((observations, i) => (
                        <ObservationCard {...observations}/>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Student