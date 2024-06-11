import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Header } from './components/Header'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Conversations } from './pages/Conversations'
import { Users } from './pages/Users'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>

      <Routes>
        <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<Home/>} /> 
          <Route path="/conversations" element={<Conversations/>} /> 
          <Route path="/users" element={<Users/>} />        
        </Route>
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>

    </>
  )
}

export default App
