import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import {UserDataContext} from '../contexts/UserContext.jsx'


const UserSignUp = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate() 

  const { user, setUser } = useContext(UserDataContext);


  const submitHandler = async (e) => {
    e.preventDefault()

    const newUser={
      fullName:fullName,
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if (response.status === 201){
      const data = response.data
      setUser(data.user)
      navigate('/home')
    }

    setEmail('')
    setPassword('')
    setFullName('')

  }
  return (

    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img
          className='w-16 mt-10 mb-5'
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt="" />

        <form onSubmit={(e) =>
          submitHandler(e)
        } >

          <h3 className='text-base font-medium mb-2'>What's your name</h3>
          
            <input
              required
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              className='bg-[#eeeeee] rounded  px-4 py-2 border w-full text-lg placeholder:text-sm'
              type="text"
              placeholder='First name'

            />
            

          <h3 className='text-base font-medium mb-2'>What's your email</h3>

          <input
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className='bg-[#eeeeee] rounded mb-5 px-4 py-2 border w-full text-lg placeholder:text-sm'
            type="email"
            placeholder='eamil@example.com'
          />

          <h3 className='text-base font-medium mb-2'>Enter password</h3>

          <input
            required
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className='bg-[#eeeeee] rounded mb-5 px-4 py-2 border w-full text-lg placeholder:text-sm'
            type="password"
            placeholder='password' />

          <button className='bg-[#111] text-white font-semibold  px-4 py-2 w-full text-lg placeholder:text-base'>Create account </button>

        </form>
        <p className='text-center mt-2'>Already have a account? <Link to="/login" className='text-blue-600'>Login here</Link></p>

      </div>
      <p className='text-[10px] leading-tight '>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
        Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>

    </div>

  )
}

export default UserSignUp