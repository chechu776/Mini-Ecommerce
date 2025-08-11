import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login.jsx'
import Home from './pages/home.jsx'
import Signup from './pages/signup.jsx'
import Admindashboard from './pages/admindashboard.jsx'
import Showallproducts from './pages/manageproducts.jsx'
import Showallusers from './pages/manageusers.jsx'
import Manageorders from './pages/manageorders.jsx'
import Managecategories from './pages/managecategories.jsx'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/" element={<Login />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/login" element={<Login />} /> 
      <Route path='/signup' element={<Signup/>}/>
      <Route path="/admindashboard" element={<Admindashboard/>}/>
      <Route path='/product/showAllProduct' element={<Showallproducts/>}/>
      <Route path='/admin/showAllUsers' element={<Showallusers/>}/>
      <Route path='/order/showAllOrders' element={<Manageorders/>}/>
      <Route path='/category/showAllCategory' element={<Managecategories/>}/>
      
    </Routes>
  )
}

export default App