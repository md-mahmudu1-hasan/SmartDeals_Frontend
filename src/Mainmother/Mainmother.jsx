import Navbar from '../Components/Navber'
import { Outlet } from 'react-router'
import Footer from '../Pages/Footer'

const Mainmother = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default Mainmother
