import { useEffect, useState } from 'react'
import style from './adminTeacher.module.css'
import { getListTeachers } from '../../../api/services/teacherService'
import SidebarAdmin from '../components/sidebar'
import StudentListItem from '../../teacher/components/studentListItem/studentListItem'
import Table from '../../../components/table/table'
import TextInput from '../../../components/textInput/textInput'
import Button from '../../../components/button/button'
import CreateTeacherModal from '../components/createTeacherModal/createTeacherModal'
import EditTeacherModal from '../components/editTeacherModal/editTeacherModal'

function AdminTeachers() {
    const [teachers, setTeachers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [selectedTeacher, setSelectedTeacher] = useState(null)

    const filteredTeachers = teachers.filter(teacher => {
        const term = searchTerm.toLowerCase().trim()
        return (teacher.name ?? "").toLowerCase().includes(term)
    })

    async function loadTeachers() {
        const data = await getListTeachers()
        setTeachers(data)
    }

    useEffect(() => { loadTeachers() }, [])

    function openEdit(teacher) {
        setSelectedTeacher(teacher)
        setEditModalOpen(true)
    }

    return (
        <>
            <SidebarAdmin/>
            <section className={style.content}>
                <h1>Professores</h1>
                <div className={style.teachers}>
                    <div className={style.actions}>
                        <TextInput
                            placeholder="Pesquise os professores aqui..."
                            value={searchTerm}
                            onChange={setSearchTerm}
                            size="lg"
                        />
                        <Button content="Criar Professor" onClick={() => setCreateModalOpen(true)}/>
                    </div>
                    <div className={style.teachersList}>
                        <Table
                                columns={["cpf","name","username","hireDate","subjects"]}
                                titles={["CPF","Nome","Login","Data de entrad", "Matérias"]}
                                values={filteredTeachers}
                                onEdit={(teacher) => openEdit(teacher)}
                        />
                    </div>
                </div>
            </section>
            <CreateTeacherModal
                isOpen={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSuccess={loadTeachers}
            />
            <EditTeacherModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                teacher={selectedTeacher}
                onSuccess={loadTeachers}
            />
        </>
    )
}

export default AdminTeachers