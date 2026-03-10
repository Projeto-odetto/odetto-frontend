import { useEffect, useState } from 'react'
import style from './adminStudent.module.css'
import TextInput from '../../components/textInput/textInput'
import Table from '../../components/table/table'
import { getListStudents } from '../../api/services/studentService'
import SidebarAdmin from './components/sidebar'

function AdminStudents() {
    const [studentsTable, setStudentsTable] = useState([])

    const [searchTerm, setSearchTerm] = useState("")
    const filteredStudents = studentsTable.filter((student) => {
    const term = searchTerm.toLowerCase().trim()

    const matchesName = student.name
        .toLowerCase()
        .includes(term)

    const matchesEnrollment = student.enrollment
        .toString()
        .startsWith(term)

    return matchesName || matchesEnrollment
    })

    useEffect(() => {
        async function getStudents() {
            const students = await getListStudents()
            console.log(students)
            setStudentsTable(students)
        }

        getStudents()
    }, [])



    return (
        <section className={style.content}>
            <SidebarAdmin/>
            <div className={style.actions}>
                    <TextInput
                        placeholder='Pesquise seus alunos'
                        value={searchTerm}
                        onChange={setSearchTerm}
                        size='lg'
                    />
            </div>

            <div className={style.container}>
            <Table 
                columns={["enrollment","name","email","cpf"]}
                titles={["Matrícula", "Nome", "E-mail","CPF"]}
                values={filteredStudents}
            />
        </div>
        </section>
    )
}

export default AdminStudents