import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/admin_login.jsx'
import Home from './pages/home.jsx'
import Signup from './pages/signup.jsx'
import Admindashboard from '../components/admindashboard.jsx'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/login" element={<Login />} /> 
      <Route path='/signup' element={<Signup/>}/>
      <Route path="/admindashboard" element={<Admindashboard/>}/>
    </Routes>
  )
}

export default App