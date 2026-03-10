import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export function generateReportPdf(student, grades, observations) {
    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text("Boletim Escolar", 105, 20, { align: "center" })

    doc.setFontSize(12)
    doc.text(`Aluno: ${student.name}`, 20, 40)
    doc.text(`Matrícula: ${student.enrollment}`, 20, 48)

    const tableData = grades.map((grade) => [
        grade.subjectName,
        grade.teacherName,
        grade.grades.join(", "),
        grade.average
    ])

    autoTable(doc, {
        startY: 60,
        head: [["Disciplina", "Professor", "Notas", "Média"]],
        body: tableData
    })

    let finalY = doc.lastAutoTable.finalY + 20

    doc.setFontSize(14)
    doc.text("Observações", 20, finalY)

    finalY += 10

    doc.setFontSize(12)

    observations.forEach((obs) => {
        const text = `${obs.teacherName} (${obs.subjectName}): ${obs.observation}`

        const splitText = doc.splitTextToSize(text, 170) 

        doc.text(splitText, 20, finalY)

        finalY += splitText.length * 7
    })

    doc.save(`boletim-${student.name}.pdf`)
}