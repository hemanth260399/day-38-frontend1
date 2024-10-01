import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './userpage/loginpage'
import { Register } from './userpage/registerpage'
import { Home } from './userpage/homepage'
import { Urlshortner } from './userpage/urlshortner'
import { Emailverify } from './userpage/Email-verify'
import { Resetpassword } from './userpage/resetpassword'
import PropTypes from "prop-types";
import { Emailverifyregister } from './userpage/registerverifyemail'
import { Short } from './userpage/short'
import { Dashboard } from './userpage/dashboard'
import { Urlhistroy } from './userpage/urlhistroy'
function App() {
  let Privateroute = ({ component }) => {
    let isAuthenticated = Boolean(localStorage.getItem("useremail"))
    if (isAuthenticated) {
      return component
    }
    else {
      return <Navigate to='/login' />
    }
  }
  Privateroute.propTypes = {
    component: PropTypes.node
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path='/urlshortner' element={<Privateroute component={<Urlshortner />} />} />
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/verify-email' element={<Emailverify />} />
            <Route path='/reset-password' element={<Resetpassword />} />
            <Route path="/register-verify-email" element={<Emailverifyregister />} />
            <Route path='/short' element={<Short />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path="/urlhistroy" element={<Urlhistroy />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App