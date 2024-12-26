import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import UserSignUp from './pages/UserSignUp'
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import Start from './pages/Start'



const App = () => {
  return (
    <div>
     <Routes >
      <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
