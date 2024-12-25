import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'


const UserLogin = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      email:email,
      password: password
    })

    console.log(userData);
    
    setEmail('')
    setPassword('')
    
  }

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img
          className='w-16 my-10'
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
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

          <button className='bg-[#111] text-white font-semibold mt-5 px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>

        </form>
        <p className='text-center mt-5'>New here? <Link to="/signup" className='text-blue-600'>Create new Account</Link></p>
      </div>
      <div className=''>
        <Link  to="/captain-login" className='flex justify-center items-center bg-[#b9ea34] text-black font-semibold px-4 py-2 w-full text-lg placeholder:text-base'>
          Sign as Captain</Link>
      </div>

    </div>
  )
}

export default UserLogin