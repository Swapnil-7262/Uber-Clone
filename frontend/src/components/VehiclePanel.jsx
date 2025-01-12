import React from 'react'

const VehiclePanel = (props) => {

  // console.log(props);

  return (
    <div>
      <h3 onClick={() =>
        props.setVehiclePanel(false)
      }
        className=' flex items-center justify-center w-full text-2xl absolute p-2 top-0 mb-10'>
        <i className="ri-arrow-down-wide-line text-center"></i></h3>
      <h2 className='text-3xl mt-4 font-semibold'>Choose a Vehicle </h2>
      <div onClick={() =>
        props.setComfirmRide(true)
      }
        className=' flex items-center border-2 rounded-3xl active:border-black p-2 mb-3 mt-3'>
        <img
          className='w-24'
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt="" />
        <div className='w-1/2'>
          <h4 className='font-semibold text-lg '>Uber Go <span><i className="ri-user-3-fill"></i></span>4</h4>
          <h5 className='font-medium'>2 mins aways</h5>
          <p className='text-base font-normal text-gray-500 leading-tight'>Affordable, compact rides</p>
        </div>
        <h2 className='font-bold text-xl '>₹{props.fare.car}</h2>
      </div>

      <div onClick={() =>
        props.setComfirmRide(true)
      }
        className=' flex items-center border-2 rounded-3xl active:border-black p-2 mb-3'>
        <img
          className='w-24'
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt="" />
        <div className='w-1/2'>
          <h4 className='font-semibold text-lg '>Moto <span><i className="ri-user-3-fill"></i></span>1</h4>
          <h5 className='font-medium'>3 mins aways</h5>
          <p className='text-base font-normal text-gray-500 leading-tight'>Affordable motocycle rides</p>
        </div>
        <h2 className='font-bold text-xl '>₹{props.fare.moto}</h2>
      </div>

      <div onClick={() =>
        props.setComfirmRide(true)
      }
        className=' flex items-center border-2 rounded-3xl active:border-black p-2 mb-3'>
        <img
          className='w-24'
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt="" />
        <div className='w-1/2'>
          <h4 className='font-semibold text-lg '>Uber Auto <span><i className="ri-user-3-fill"></i></span>2</h4>
          <h5 className='font-medium'>2 mins aways</h5>
          <p className='text-base font-normal text-gray-500 leading-tight'>Affordable auto rides</p>
        </div>
        <h2 className='font-bold text-xl '>₹{props.fare.auto}</h2>
      </div>
    </div>
  )
}

export default VehiclePanel