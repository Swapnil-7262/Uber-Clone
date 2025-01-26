import React, { useRef, useState, useEffect, useContext } from 'react'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocatioSearchPanel from '../components/LocatioSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ComfirmRide from '../components/ComfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import axios from "axios"
import {SocketContext} from '../contexts/SocketContext'
import {UserDataContext} from "../contexts/UserContext"


const Home = () => {

  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [comfirmRide, setComfirmRide] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)

  const [pickupSuggestion, setPickupSuggestion] = useState([])
  const [destinationSuggestion, setDestinationSuggestion] = useState([])
  const [activeField, setActiveField] = useState(null)

  const [fare, setFare] = useState({})

  const [vehicleType, setVehicleType] = useState(null)

  const vehiclePanelRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const comfirmRideRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const {socket} = useContext(SocketContext)
  const {user , setUser} = useContext(UserDataContext)


  useEffect(() => {
    socket.emit("join", {userType: "user", userId: user._id})
     
    }, [user]);
  

  const submitHandler = (e) => {
    e.preventDefault();
  }

  const changePickupHandler = async (e) => {
    setPickup(e.target.value)
    // console.log(localStorage.getItem("token"))

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-auto-suggest`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })

      // console.log(response.data.data.results);

      setPickupSuggestion(response.data.data.results)
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // 
  const changeDestinationHandler = async (e) => {
    setDestination(e.target.value)

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-auto-suggest`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })

      // console.log(response.data.data.results);

      setDestinationSuggestion(response.data.data.results)
    } catch (error) {
      console.error(error);
      throw error;
    }
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
        transform: 'translateY(110%)',
        padding: "0"
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
        transform: 'translateY(110%)',
        
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
  }, [waitingForDriver])

  async function findTrip() {
    setVehiclePanel(true)
    setPanelOpen(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: {
        pickup, destination
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
    )

    // console.log(response.data.data)

    setFare(response.data.data)
  }

  async function createRide() {

    // console.log(localStorage.getItem("token"));

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup, destination, vehicleType
    },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    )

    console.log(response.data);

  }

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
              onChange={changePickupHandler}
              className='w-full rounded-lg px-9 py-3 bg-[#eee] mb-5 text-base'
              type="text"
              placeholder='Add a pick-up location'
              onFocus={() => setActiveField("pickup")} />

            <input
              onClick={() =>
                setPanelOpen(true)
              }
              value={destination}
              onChange={changeDestinationHandler}
              className='w-full rounded-lg px-9 py-3 bg-[#eee] mb-5 text-base'
              type="text"
              placeholder='Enter your destination'
              onFocus={() => setActiveField("destination")} />
          </form>

          <button
            onClick={findTrip}
            className='bg-black text-white font-medium text-lg px-4 py-2 rounded-lg mt-2  w-full'>
            Find Trip
          </button>
        </div>

        {/* LocatioSearchPanel section */}
        <div ref={panelRef} className='bg-white h-[0] '>
          <LocatioSearchPanel
            suggestions={activeField === "pickup" ? pickupSuggestion : destinationSuggestion}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField} />
        </div>
      </div>

      {/* Vevhicle details components */}
      <div ref={vehiclePanelRef}
        className='fixed z-10 bottom-0 w-full bg-white px-3 py-5 translate-y-full'>
        <VehiclePanel
          setVehicleType={setVehicleType}
          setComfirmRide={setComfirmRide}
          setVehiclePanel={setVehiclePanel}
          fare={fare} />
      </div>

      {/* comfirm Ride panel section  */}
      <div ref={comfirmRideRef}
        className='fixed z-10 bottom-0 w-full bg-white px-5 translate-y-full'>
        <ComfirmRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          setVehiclePanel={setVehiclePanel}
          setComfirmRide={setComfirmRide}
          setVehicleFound={setVehicleFound} />
      </div>

      {/* vehicle details section  */}
      <div ref={vehicleFoundRef}
        className='fixed z-10 bottom-0 w-full bg-white px-3 py-5 translate-y-full'>
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          setVehicleFound={setVehicleFound} />
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