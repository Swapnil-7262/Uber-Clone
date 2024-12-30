import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../contexts/CaptianContext'

const CaptainLogin = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const { captain, setCaptain } = useContext(CaptainDataContext)
  const nevigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      email: email,
      password: password,
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData, { withCredentials: true })

    console.log(response);

    if (response.status === 200) {
      const data = response.data.data
      console.log(data);
      setCaptain(data.loggedCaptain)
      localStorage.setItem('token', data.accessToken)
      nevigate('/captain-home')
    }

    // console.log(captain);

    setEmail('')
    setPassword('')

  }
  useEffect(() => {
    console.log(captain); // This will log the updated captain value
  }, [captain]);

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img
          className='w-16 mt-10'
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="" />

        <form onSubmit={(e) =>
          submitHandler(e)
        } >

          <h3 className='text-lg font-medium mb-2'>What's your email</h3>

          <input
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className='bg-[#eeeeee] rounded mb-7 px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='eamil@example.com'

          />
          <h3 className='text-lg font-medium mb-2'>Enter password</h3>

          <input
            required
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className='bg-[#eeeeee] rounded mb-7 px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder='password' />

          <button className='bg-[#111] text-white font-semibold  mt-5 px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>

        </form>
        <p className='text-center mt-5'>Join a fleet? <Link to="/captain-signup" className='text-blue-600'>Resigter as a captain </Link></p>
      </div>
      <div className=''>
        <Link to="/login" className='flex justify-center items-center bg-[#b9ea34] text-black font-semibold   px-4 py-2 w-full text-lg placeholder:text-base'>
          Sign as User</Link>
      </div>

    </div>
  )
}

export default CaptainLogin