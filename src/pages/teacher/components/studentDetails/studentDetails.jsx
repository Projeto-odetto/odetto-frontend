import styles from './studentDetails.module.css'
import ObservationCard from '../../../../components/observationCard/observationCard'
import Button from '../../../../components/button/button'
import IconButton from '../../../../components/iconButton/iconButton'
import arrowLeft from '../../../../assets/icons/arrow-left.svg'
import arrowRight from '../../../../assets/icons/arrow-right.svg'
import { useEffect } from 'react'
import { getGradesBySubject, getObservationsStudent } from '../../../../api/services/studentService'
import { useAuth } from '../../../../contexts/authContext'

function StudentDetails({
    isOpen = false,
    onClose,
    student,
    toPrevious,
    toNext,
    onOpenCreateObservation,
    onGetGrades,
    onGetObservations,
    onOpenEditGrades
}) {
    const { user } = useAuth()
    
    useEffect(() => {
        if (!isOpen) return
        if (!student) return
        
        async function getSelectedStudentGrades() {
            if (student.gradesData) return
    
            const gradesResponse = await getGradesBySubject(student.enrollment, user.subject)

            onGetGrades(gradesResponse)
        }

        async function loadObservations() {
            if (student.observationsData) return

            const observations = await getObservationsStudent(student.enrollment)

            onGetObservations(observations)
        }

        getSelectedStudentGrades()
        loadObservations()
    }, [isOpen, toPrevious, toNext])

    if (!isOpen || !student) return null

    return (
        <div className={`
            ${styles.overlay}
            ${isOpen ? "" : styles.closed}
        `}
            onClick={onClose}
        >
            <div
                className={styles.modal}
                onClick={(e) => {e.stopPropagation()}}
            >
                <div className={styles.leftContent}>
                    <div className={styles.leftUpperContent}>
                        <div className={styles.studentSelection}>
                            <IconButton
                                icon={arrowLeft}
                                onClick={toPrevious}
                            />
                            <div className={styles.selectedStudent}>
                                <h2>{student.name}</h2>
                                <h4> Matrícula {student.enrollment}</h4>
                            </div>
                            <IconButton
                                icon={arrowRight}
                                onClick={toNext}
                            />
                        </div>
                        <div className={styles.gradesTable}>
                            <div className={styles.tableHeader}>
                                <h4>Notas</h4>
                            </div>
                            {!student.gradesData ? (
                                <p>Nenhuma nota encontrada.</p>
                            ) : (
                                <>
                                    {student.gradesData.grades.map((grade, i) => (
                                        <div key={i} className={styles.tableItem}>
                                            <p>Nota {i + 1}</p>
                                            <p>{grade.toFixed(1)}</p>
                                        </div>
                                    ))}
                                    
                                    <div className={styles.tableFooter}>
                                        <h4>Média: {student.gradesData.average}</h4>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <Button
                        content="Editar Notas"
                        size='md'
                        onClick={onOpenEditGrades}
                    />
                </div>

                <div className={styles.rightContent}>
                    <h2>Observações</h2>
                    <div className={styles.observations}>
                            {student.observationsData ? (
                                student.observationsData.map((observation) => (
                                    <ObservationCard key={observation.id} {...observation}/>
                                ))
                            ) : (
                                <p>Nenhuma observação encontrada.</p>
                            )}
                    </div>

                    <Button
                        content="Escrever Observação"
                        size='md'
                        onClick={onOpenCreateObservation}
                    />
                </div>
            </div>
        </div>
    )
}

export default StudentDetails