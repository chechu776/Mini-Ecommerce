import React from 'react'
import Sidebar from '../../components/sidebar.jsx'
import Dash from '../../components/dash.jsx'
const Admindashboard = () => {
  return (
   <div className="w-screen h-screen bg-gray-800 flex relative">
      <div className="group">
        <Sidebar />
      </div>
      <div className="transition-all duration-300 ml-64 w-full">
        <Dash />
      </div>
    </div>
  )
}

export default Admindashboard