import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Header from './components/header/header'
import { AppRoutes } from './routes/appRoutes'

function App() {
  return (
    <BrowserRouter>
      <Header>
        <AppRoutes/>
      </Header>
    </BrowserRouter>
  )
}

export default App