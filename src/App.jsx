import { useState } from 'react'
import './App.css'
import Header from './components/header/header'
import TextInput from './components/textInput/textInput'
import Button from './components/button/button';

function App() {
  const [texto, setTexto] = useState("Texto");

  return (
    <>
      <Header/>

      <TextInput value={texto} onChange={setTexto} size="md"/>

      <Button content="Botão" size='md' onClick={() => {console.log(texto)}}/>
    </>
  )
}

export default App