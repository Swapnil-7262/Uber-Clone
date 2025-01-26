import React, { useState, useRef, useContext, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopup'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { CaptainDataContext } from '../contexts/CaptianContext'
import {SocketContext} from '../contexts/SocketContext'

const Captain_Home = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)

  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {

    if (!captain) return;
    console.log(captain._id);
    
    socket.emit("join",{
      userId: captain._id,
      userType:"captain"
    })
  }, [captain, socket])
  

  useGSAP(function () {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopupPanel])

  useGSAP(function () {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopupPanel])

  // if (!captain) {
  //   return <div>Loading....</div>
  // }

  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-[70%]'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

      </div>

      <div className=' h-[30%] p-4'>
        <CaptainDetails 
        captain= {captain}/>
      </div>

      <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 transla1te-y-full bg-white px-3 py-10 pt-12'>
        <RidePopUp
          setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div>

      <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <ConfirmRidePopUp
          setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div>

    </div>
  )
}

export default Captain_Home