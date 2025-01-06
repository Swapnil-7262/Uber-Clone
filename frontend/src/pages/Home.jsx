import React, { useRef, useState } from 'react'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocatioSearchPanel from '../components/LocatioSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ComfirmRide from '../components/ComfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'


const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [comfirmRide, setComfirmRide] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)

  const vehiclePanelRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const comfirmRideRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault();

  }

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%'
      })

      gsap.to(panelCloseRef.current, {
        opacity: "1"
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0'
      })

      gsap.to(panelCloseRef.current, {
        opacity: "0"
      })
    }
  }, [panelOpen])

  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])

  useGSAP(function () {
    if (comfirmRide) {
      gsap.to(comfirmRideRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(comfirmRideRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [comfirmRide])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])

  useGSAP(function () {
    if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(waitingForDriverRef.current, {
            transform: 'translateY(100%)'
        })
    }
}, [ waitingForDriver ])

  return (
    <div className='h-screen relative overflow-hidden'>
      <img
        className='w-16 absolute top-5 left-5 '
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

      <div className='h-screen w-screen'>
        <img className='w-full h-full object-cover '
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="" />
      </div>

      <div className=' h-full w-full absolute flex flex-col justify-end top-0'>
        <div className=' h-[30%] p-8 relative  bg-white'>
          <form onSubmit={(e) =>
            submitHandler(e)}>

            <h5 ref={panelCloseRef}
              onClick={() => {
                setPanelOpen(false)
              }}
              className='top-6 right-6 absolute text-2xl font-semibold opacity-0'>
              <i className="ri-arrow-down-wide-line"></i>
            </h5>


            <h3 className='text-2xl font-bold mb-3'>Find a trip </h3>

            <input
              onClick={() =>
                setPanelOpen(true)
              }
              value={pickup}
              onChange={(e) =>
                setPickup(e.target.value)
              }
              className='w-full rounded-lg px-9 py-3 bg-[#eee] mb-5 text-base'
              type="text"
              placeholder='Add a pick-up location' />

            <input
              onClick={() =>
                setPanelOpen(true)
              }
              value={destination}
              onChange={(e) =>
                setDestination(e.target.value)
              }
              className='w-full rounded-lg px-9 py-3 bg-[#eee] mb-5 text-base'
              type="text"
              placeholder='Enter your destination' />
          </form>
        </div>

        {/* LocatioSearchPanel section */}
        <div ref={panelRef} className='bg-white h-[0] '>
          <LocatioSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>

      {/* Vevhicle details components */}
      <div ref={vehiclePanelRef}
        className='fixed z-10 bottom-0 w-full bg-white px-3 py-5 translate-y-full'>
        <VehiclePanel setComfirmRide={setComfirmRide} setVehiclePanel={setVehiclePanel} />
      </div>

      {/* comfirm Ride panel section  */}
      <div ref={comfirmRideRef}
        className='fixed z-10 bottom-0 w-full bg-white px-3 py-5 translate-y-full'>
        <ComfirmRide setVehiclePanel={setVehiclePanel} setComfirmRide={setComfirmRide} setVehicleFound={setVehicleFound} />
      </div>

      {/* vehicle details section  */}
      <div ref={vehicleFoundRef}
        className='fixed z-10 bottom-0 w-full bg-white px-3 py-5 translate-y-full'>
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>

      {/* waiting for driver  */}
      <div ref={waitingForDriverRef}
        className='fixed z-10 bottom-0 w-full bg-white px-3 py-5 translat1e-y-full'>
        <WaitingForDriver
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver} />
      </div>

    </div>
  )
}

export default Home