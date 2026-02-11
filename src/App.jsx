import './App.css'
import Header from './components/header/header'
import ObservationCard from './components/observationCard/observationCard'

function App() {
  const obs = {
    subject: "Mobile",
    author: "Nisflei",
    observation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dolor eros, auctor non eros sed, vulputate pharetra ante."
  }

  return (
    <>
      <Header>
        <ObservationCard {...obs}/>
      </Header>
    </>
  )
}

export default App