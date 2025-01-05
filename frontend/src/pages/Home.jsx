import React, { useRef, useState } from 'react'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocatioSearchPanel from '../components/LocatioSearchPanel'


const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)

  const vehiclePanelRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)

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
  },[vehiclePanel])

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
        <h2 className='text-3xl font-semibold'>Choose a Vehicle </h2>
        <div className=' flex items-center border-2 rounded-3xl active:border-black p-2 mb-3 mt-3'>
          <img
            className='w-24'
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            alt="" />
          <div className='w-1/2'>
            <h4 className='font-semibold text-lg '>Uber Go <span><i className="ri-user-3-fill"></i></span>4</h4>
            <h5 className='font-medium'>2 mins aways</h5>
            <p className='text-base font-normal text-gray-500 leading-tight'>Affordable, compact rides</p>
          </div>
          <h2 className='font-bold text-xl '>₹193.30</h2>

        </div>

        <div className=' flex items-center border-2 rounded-3xl active:border-black p-2 mb-3'>
          <img
            className='w-24'
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
            alt="" />
          <div className='w-1/2'>
            <h4 className='font-semibold text-lg '>Moto <span><i className="ri-user-3-fill"></i></span>1</h4>
            <h5 className='font-medium'>3 mins aways</h5>
            <p className='text-base font-normal text-gray-500 leading-tight'>Affordable motocycle rides</p>
          </div>
          <h2 className='font-bold text-xl '>₹64.90</h2>

        </div>

        <div className=' flex items-center border-2 rounded-3xl active:border-black p-2 mb-3'>
          <img
            className='w-24'
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
            alt="" />
          <div className='w-1/2'>
            <h4 className='font-semibold text-lg '>Uber Auto <span><i className="ri-user-3-fill"></i></span>2</h4>
            <h5 className='font-medium'>2 mins aways</h5>
            <p className='text-base font-normal text-gray-500 leading-tight'>Affordable auto rides</p>
          </div>
          <h2 className='font-bold text-xl '>₹115.25</h2>

        </div>
      </div>
    </div>
  )
}

export default Home