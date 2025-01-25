import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserSignUp from './pages/UserSignUp'
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import Start from './pages/Start'
import UserProtectWapper from './pages/UserProtectWapper'
import UserLogout from './pages/UserLogout'
import Captain_Home from './pages/Captain_Home'
import CaptainProtectWapper from './pages/CaptainProtectWapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'



const App = () => {
  return (
    <div>
      <Routes >
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />

        <Route path='/riding' element={<Riding/>}></Route>
        <Route path='/captain-riding' element={<CaptainRiding/>}></Route>

        <Route path="/home" element={
          <UserProtectWapper>
            <Home />
          </UserProtectWapper>} />

        <Route path='/user-logout' element={
          <UserProtectWapper>
            <UserLogout />
          </UserProtectWapper>
        } />

        <Route path='/captain-home' element={
          <CaptainProtectWapper>
            <Captain_Home />
          </CaptainProtectWapper>
        } />

        <Route path='/captain-logout' element={
          <CaptainProtectWapper>
            <CaptainLogout />
          </CaptainProtectWapper>
        } />

      </Routes>
    </div>
  )
}

export default App
