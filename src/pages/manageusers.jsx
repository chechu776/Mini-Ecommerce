import React from 'react'
import Sidebar from '../../components/sidebar'
import Table from '../../components/usertable'

const Showallusers = () => {
  return (
    <div className="w-screen h-screen bg-gray-800 flex relative">
      <div className="group">
        <Sidebar />
      </div>
      <div className="transition-all duration-300 ml-64 w-full">
        <Table />
      </div>

    </div>
  )
}
export default Showallusers
