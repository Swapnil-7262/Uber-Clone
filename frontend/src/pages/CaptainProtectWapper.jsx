// import { useEffect } from "react"
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"


const CaptainProtectWapper = ({ children }) => {

  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/captain-login')
    }
  })

  return (
    <div>
      {children}
    </div>
  )
}

export default CaptainProtectWapper