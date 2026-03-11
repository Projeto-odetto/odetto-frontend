import { useEffect, useState } from 'react'
import style from './adminStudent.module.css'
import TextInput from '../../components/textInput/textInput'
import Button from '../../components/button/button'
import StudentListItem from '../teacher/components/studentListItem/studentListItem'
import Table from '../../components/table/table'
import { getListStudents } from '../../api/services/studentService'
import { deleteStudent } from '../../api/services/adminService'
import SidebarAdmin from './components/sidebar'
import PreCadastroModal from './components/preCadastroModal/preCadastroModal'
import EditStudentModal from './components/editStudentModal/editStudentModal'

function AdminStudents() {
    const [students, setStudents] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [preCadastroOpen, setPreCadastroOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState(null)

    const filteredStudents = students.filter((student) => {
        const term = searchTerm.toLowerCase().trim()
        const matchesName = (student.name ?? "").toLowerCase().includes(term)
        const matchesEnrollment = student.enrollment.toString().startsWith(term)
        return matchesName || matchesEnrollment
    })

    async function loadStudents() {
        const data = await getListStudents()
        setStudents(data)
    }

    useEffect(() => {
        loadStudents()
    }, [])

    function openEdit(student) {
        setSelectedStudent(student)
        setEditModalOpen(true)
    }

    return (
        <>
            <SidebarAdmin/>

            <section className={style.content}>
                <h1>Alunos</h1>

                <div className={style.students}>
                    <div className={style.actions}>
                        <TextInput
                            placeholder="Pesquise os alunos aqui..."
                            value={searchTerm}
                            onChange={setSearchTerm}
                            size="lg"
                        />
                        <Button
                            content="Realizar Pré-Cadastro"
                            onClick={() => setPreCadastroOpen(true)}
                        />
                    </div>

                    <div className={style.studentsList}>
                            <Table
                                columns={["enrollment","name","email","cpf"]}
                                titles={["Matrícula", "Nome", "E-mail","CPF"]}
                                values={filteredStudents}
                            />
                    </div>
                </div>
            </section>

            <PreCadastroModal
                isOpen={preCadastroOpen}
                onClose={() => setPreCadastroOpen(false)}
                onSuccess={loadStudents}
            />

            <EditStudentModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                student={selectedStudent}
                onSuccess={loadStudents}
            />
        </>
    )
}

export default AdminStudents