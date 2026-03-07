import styles from './student.module.css'
import Button from '../../components/button/button'
import ObservationCard from '../../components/observationCard/observationCard'
import GradeListItem from './component/gradeListItem'
import { useEffect, useState } from 'react'
import { getGrades } from '../../api/services/studentService'
import { useProtectedRoute } from '../../hooks/useProtectedRoute'
import { useAuth } from '../../contexts/authContext'

function Student({
    observations
}) {
    useProtectedRoute()

    const { user, loading } = useAuth()

    const [gradesData,setGradesData] = useState([])

    useEffect(() => {
        if (!user) return

        async function get(subscription) {
            const grades = await getGrades(subscription)
            setGradesData(grades)
        }

        get(user.enrollment)
    }, [user])

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
                    {observations.map((observation) => (
                        <ObservationCard {...observation}/>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Student