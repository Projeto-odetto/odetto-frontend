import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Header from './components/header/header'
import { AppRoutes } from './routes/appRoutes'
import { AuthProvider } from './contexts/authContext'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header>
          <AppRoutes/>
        </Header>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App