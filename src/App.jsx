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
import AdminProtectedRoute from './AdminProtectedRoutes.jsx'

const App = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/login" element={<Login />} /> 
      <Route path='/signup' element={<Signup/>}/>
      <Route path="/admindashboard" element={<AdminProtectedRoute><Admindashboard/></AdminProtectedRoute>}/>
      <Route path='/product/showAllProduct' element={<AdminProtectedRoute><Showallproducts/></AdminProtectedRoute>}/>
      <Route path='/admin/showAllUsers' element={<AdminProtectedRoute><Showallusers/></AdminProtectedRoute>}/>
      <Route path='/order/showAllOrders' element={<AdminProtectedRoute><Manageorders/></AdminProtectedRoute>}/>
      <Route path='/category/showAllCategory' element={<AdminProtectedRoute><Managecategories/></AdminProtectedRoute>}/>
    </Routes>
  )
}

export default App