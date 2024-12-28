import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../contexts/UserContext.jsx'



const UserLogin = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData, { withCredentials: true })
    // console.log(response);
    if (response.status === 200) {
      const data = response.data.data
      // console.log(data);
      
      const { accessToken, loggedUser } = data;
      // console.log("Logged User:", loggedUser);
      // console.log("Access Token:", accessToken);
      
      if (!accessToken) {
        throw new Error("AccessToken missing in the response.");
      }

      setUser(loggedUser)

      localStorage.setItem('token', accessToken)
      navigate('/home')
    }

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
        <Link to="/captain-login" className='flex justify-center items-center bg-[#b9ea34] text-black font-semibold px-4 py-2 w-full text-lg placeholder:text-base'>
          Sign as Captain</Link>
      </div>

    </div>
  )
}

export default UserLogin