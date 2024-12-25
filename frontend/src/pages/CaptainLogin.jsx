import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [captainData, setCaptainData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      email: email,
      password: password
    })

    console.log(captainData);

    setEmail('')
    setPassword('')

  }

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