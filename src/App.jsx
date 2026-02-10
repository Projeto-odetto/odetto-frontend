import { useState } from 'react'
import './App.css'
import Header from './components/header/header'
import Button from './components/button/button';
import InputMultiline from './components/inputMultiline/inputMultiline';

function App() {
  const [texto, setTexto] = useState("Texto");

  return (
    <>
      <Header/>

      <InputMultiline value={texto} placeholder="Insira um texto..." onChange={setTexto}/>

      <Button content="Botão" size='md' onClick={() => {console.log(texto)}}/>
    </>
  )
}

export default App