
import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import RegisterSuccess from './components/RegisterSuccess'

function App() {
  const [view, setView] = useState('login') // 'login' | 'register' | 'success'

  return (
    <>
      {view === 'login' && (
        <Login onGoRegister={() => setView('register')} />
      )}
      {view === 'register' && (
        <Register onSuccess={() => setView('success')} onGoLogin={() => setView('login')} />
      )}
      {view === 'success' && (
        <RegisterSuccess onGoLogin={() => setView('login')} />
      )}
    </>
  )
}

export default App
