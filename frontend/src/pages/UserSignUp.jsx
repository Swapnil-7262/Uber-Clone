import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignUp = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault()

    setUserData({
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password
    })

    console.log(userData);


    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')

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
          <div className='flex gap-4 mb-5'>
            <input
              required
              value={firstName}
              onChange={(e) =>
                setFirstName(e.target.value)
              }
              className='bg-[#eeeeee] rounded  px-4 py-2 border w-1/2 text-lg placeholder:text-sm'
              type="text"
              placeholder='First name'

            />
            <input
              required
              value={lastName}
              onChange={(e) =>
                setLastName(e.target.value)
              }
              className='bg-[#eeeeee] rounded  px-4 py-2 border w-1/2 text-lg placeholder:text-sm'
              type="text"
              placeholder='Last name'

            />
          </div>

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

          <button className='bg-[#111] text-white font-semibold  px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>

        </form>
        <p className='text-center mt-2'>Already have a account? <Link to="/login" className='text-blue-600'>Login here</Link></p>

      </div>
      <p className='text-[10px] leading-tight '>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
        Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>

    </div>

  )
}

export default UserSignUp