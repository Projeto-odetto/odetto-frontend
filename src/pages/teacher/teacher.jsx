import { useEffect, useState } from 'react'
import TextInput from '../../components/textInput/textInput'
import styles from './teacher.module.css'
import Button from '../../components/button/button'
import StudentListItem from './components/studentListItem/studentListItem'
import StudentDetails from './components/studentDetails/studentDetails'
import { observationsMock } from '../../mocks/observations.mock'
import CreateObservationModal from './components/createObservationModal/createObservationModal'
import { getStudents } from '../../api/services/studentService'

function Teacher({students}) {
    const [searchTerm, setSearchTerm] = useState("")
    const filteredStudents = students.filter((student) => {
        const term = searchTerm.toLowerCase().trim()

        const matchesName = student.name
            .toLowerCase()
            .includes(term)

        const matchesSubscription = student.subscription
            .toString()
            .startsWith(term)

        return matchesName || matchesSubscription
    })

    const [detailsModalodalOpen, setDetailsModalodalOpen] = useState(false)
    const [selectedSubscription, setSelectedSubscription] = useState(null)
    const selectedStudent = filteredStudents.find(
        student => student.subscription === selectedSubscription
    )

    const [observationsModalOpen, setObservationsModalOpen] = useState(false)

    useEffect(() => {
        async function gett() {
            const a = await getStudents("Matemática")

            console.log(a)
        }

        gett()
    }, [])

    function selectStudent(subscription) {
        setSelectedSubscription(subscription)
        setDetailsModalodalOpen(true)
    }

    function toPrevious() {
        const currentIndex = filteredStudents.findIndex(
            student => student.subscription === selectedSubscription
        )

        if (currentIndex > 0) {
            setSelectedSubscription(filteredStudents[currentIndex - 1].subscription)
        }
    }

    function toNext() {
        const currentIndex = filteredStudents.findIndex(
            student => student.subscription === selectedSubscription
        )

        if (currentIndex < filteredStudents.length - 1) {
            setSelectedSubscription(filteredStudents[currentIndex + 1].subscription)
        }
    }

    function createObservation(observation) {
        console.log(observation)
    }

    return (
        <>
            <h1 className={styles.pageTitle}>Seus Alunos</h1>

            <div className={styles.students}>
                <div className={styles.actions}>
                    <TextInput
                        placeholder='Pesquise seus alunos'
                        value={searchTerm}
                        onChange={setSearchTerm}
                        size='lg'
                    />

                    <Button content="Atribuir Notas"/>
                </div>

                <div className={styles.studentsList}>
                    {filteredStudents.map((student, i) => (
                        <StudentListItem
                            key={student.subscription}
                            student={student}
                            onClickButton={() => selectStudent(student.subscription)}
                        />
                    ))}
                </div>
            </div>

            <StudentDetails
                isOpen={detailsModalodalOpen}
                student={selectedStudent}
                onClose={() => setDetailsModalodalOpen(false)}
                observations={observationsMock}
                grades={[10, 7, 8]}
                toPrevious={toPrevious}
                toNext={toNext}
                onOpenCreateObservation={() => setObservationsModalOpen(true)}
            />

            <CreateObservationModal 
                isOpen={observationsModalOpen}
                onClose={() => setObservationsModalOpen(false)}
                onSend={(observation) => createObservation(observation)}
            />
        </>
    )
}

export default Teacher