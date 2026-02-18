import styles from './studentDetails.module.css'
import ObservationCard from '../../../../components/observationCard/observationCard'
import Button from '../../../../components/button/button'
import IconButton from '../../../../components/iconButton/iconButton'
import arrowLeft from '../../../../assets/icons/arrow-left.svg'
import arrowRight from '../../../../assets/icons/arrow-right.svg'

function StudentDetails({
    isOpen = false,
    onClose,
    student,
    grades,
    observations,
    toPrevious,
    toNext
}) {
    const mean = (grades.reduce((acc, grade) => acc + grade, 0) / grades.length).toFixed(1)

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
                    <div className={styles.studentSelection}>
                        <IconButton
                            icon={arrowLeft}
                            onClick={toPrevious}
                        />

                        <div className={styles.selectedStudent}>
                            <h2>{student.name}</h2>
                            <h4> Matrícula {student.subscription}</h4>
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

                        {grades.map((grade, i) => (
                            <div className={styles.tableItem}>
                                <p>Nota {i + 1}</p>

                                <p>{grade.toFixed(1)}</p>
                            </div>
                        ))}

                        <div className={styles.tableFooter}>
                            <h4>Média: {mean}</h4>
                        </div>
                    </div>
                </div>

                <div className={styles.rightContent}>
                    <h2>Observações</h2>
                    
                    <div className={styles.observations}>
                        {observations.map((observation) => (
                            <ObservationCard {...observation}/>
                        ))}
                    </div>

                    <Button
                        content="Escrever Observação"
                        size='md'
                    />
                </div>
            </div>
        </div>
    )
}

export default StudentDetails