import { useEffect, useState } from 'react'
import TextInput from '../../components/textInput/textInput'
import styles from './teacher.module.css'
import Button from '../../components/button/button'
import StudentListItem from './components/studentListItem/studentListItem'
import StudentDetails from './components/studentDetails/studentDetails'
import CreateObservationModal from './components/createObservationModal/createObservationModal'
import { getStudents } from '../../api/services/studentService'
import { useAuth } from '../../contexts/authContext'
import EditGradesModal from './components/editGradesModal/editGradesModal'

function Teacher() {
    const { user, loading } = useAuth()

    const [students, setStudents] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const filteredStudents = students.filter((student) => {
        const term = searchTerm.toLowerCase().trim()

        const matchesName = student.name
            .toLowerCase()
            .includes(term)

        const matchesEnrollment = student.enrollment
            .toString()
            .startsWith(term)

        return matchesName || matchesEnrollment
    })

    const [detailsModalodalOpen, setDetailsModalodalOpen] = useState(false)
    const [selectedEnrollment, setSelectedEnrollment] = useState(null)
    const selectedStudent = filteredStudents.find(
        student => student.enrollment === selectedEnrollment
    )

    const [editGradesModalOpen, setEditGradesModalOpen] = useState(false)
    const [observationsModalOpen, setObservationsModalOpen] = useState(false)

    useEffect(() => {
        async function get() {
            const studentsData = await getStudents(user.selectedSubject)

            setStudents(studentsData)
        }

        get()
    }, [])

    function selectStudent(enrollment) {
        setSelectedEnrollment(enrollment)
        setDetailsModalodalOpen(true)
    }

    function toPrevious() {
        const currentIndex = filteredStudents.findIndex(
            student => student.enrollment === selectedEnrollment
        )

        if (currentIndex > 0) {
            setSelectedEnrollment(filteredStudents[currentIndex - 1].enrollment)
        }
    }

    function toNext() {
        const currentIndex = filteredStudents.findIndex(
            student => student.enrollment === selectedEnrollment
        )

        if (currentIndex < filteredStudents.length - 1) {
            setSelectedEnrollment(filteredStudents[currentIndex + 1].enrollment)
        }
    }

    function saveGrades(gradesData) {
        setStudents(prevStudents =>
            prevStudents.map(student =>
                student.enrollment === selectedStudent.enrollment
                    ? { ...student, gradesData }
                    : student
            )
        )
    }

    function saveObservations(observationsData) {
        setStudents(prevStudents =>
            prevStudents.map(student =>
                student.enrollment === selectedStudent.enrollment
                    ? { ...student, observationsData }
                    : student
            )
        )
    }

    if (loading) return null
    if (!user) return null

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
                            key={student.enrollment}
                            student={student}
                            onClickButton={() => selectStudent(student.enrollment)}
                        />
                    ))}
                </div>
            </div>

            <StudentDetails
                isOpen={detailsModalodalOpen}
                student={selectedStudent}
                onClose={() => setDetailsModalodalOpen(false)}
                toPrevious={toPrevious}
                toNext={toNext}
                onOpenCreateObservation={() => setObservationsModalOpen(true)}
                onGetGrades={(grades) => saveGrades(grades)}
                onGetObservations={(observations) => saveObservations(observations)}
                onOpenEditGrades={() => setEditGradesModalOpen(true)}
            />

            <CreateObservationModal 
                isOpen={observationsModalOpen}
                onClose={() => setObservationsModalOpen(false)}
                student={selectedStudent}
            />

            <EditGradesModal
                isOpen={editGradesModalOpen}
                onClose={() => setEditGradesModalOpen(false)}
                student={selectedStudent}
            />
        </>
    )
}

export default Teacher