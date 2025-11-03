import React from 'react'
import Navbar from '../Components/Navber'
import { Outlet } from 'react-router'

const Mainmother = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  )
}

export default Mainmother
