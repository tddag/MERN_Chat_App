import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Route, Routes } from 'react-router-dom'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Conversations } from './pages/Conversations'
import { Users } from './pages/Users'

function App() {

  return (
    <div className="h-full">
      <Header/>

      <Routes>
        <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<Conversations/>} />
          <Route path="/conversations/" element={<Conversations/>} /> 
          <Route path="/conversations/:id" element={<Conversations/>} /> 
          <Route path="/users" element={<Users/>} />        
        </Route>
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>

    </div>
  )
}

export default App
