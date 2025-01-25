// import { useEffect } from "react"
import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {CaptainDataContext} from "../contexts/CaptianContext"


const CaptainProtectWapper = ({ children }) => {

  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const {captain, setCaptain} = useContext(CaptainDataContext)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (!token) {
      navigate('/captain-login')
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then(response =>{
      if (response.status === 200) {
        // console.log(response);
        const data = response.data.data.captain
        console.log(data);
        setCaptain(data)
        setLoading(true)
      }
    }).catch(err=>{
        // console.log(err);
        setLoading(false)
        localStorage.removeItem('token') 
        // navigate('/captain-login')
      }
    )

  },[token])

  return (
    <div>
      {children}
    </div>
  )
}

export default CaptainProtectWapper