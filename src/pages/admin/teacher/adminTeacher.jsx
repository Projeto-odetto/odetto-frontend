import { useEffect, useState } from 'react'
import style from './adminTeacher.module.css'
import { getListTeachers } from '../../../api/services/teacherService'
import Table from '../../../components/table/table'
import SidebarAdmin from '../components/sidebar'

function AdminTeachers() {
    const [teacherData, setTeacherData] = useState([])

    useEffect( () => {
        async function getTeacher() {
            const teachers = await getListTeachers()

            setTeacherData(teachers)
        }

        getTeacher()
    }, [])

    return (
        <section className={style.container}>
            <SidebarAdmin/>
             <div className={style.actions}>
            <Table
                columns={["cpf","name","username","hireDate","subjects"]}
                titles={["CPF", "Nome", "Login de usuário","Data de entrada", "Matérias"]}
                values={teacherData}
            />
        </div>
        </section>
    )
}

export default AdminTeachers