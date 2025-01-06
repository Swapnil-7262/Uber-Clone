import React from 'react'

const ComfirmRide = (props) => {
    return (
        <div>
            <h3
                    onClick={() =>
                    props.setComfirmRide(false)
                  }
                className=' flex items-center justify-center w-full text-2xl absolute p-2 top-0 mb-10'>
                <i className="ri-arrow-down-wide-line text-center"></i></h3>

            <h2 className='text-3xl mt-4 font-bold'>Choose your ride </h2>

            <div className=''>
                <div className='flex flex-col items-center justify-center'>
                    <img
                        className='h-30'
                        src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                        alt="" />
                </div>

                <div className='flex items-center gap-5'>
                    <h3 className='px-2 py-1.5 bg-gray-300 rounded-full'><i className="  ri-map-pin-range-fill"></i></h3>
                    <div className='p-2 leading-tight'>
                        <h4 className='text-lg font-bold'>13/ 89B</h4>
                        <p className='text-base font-medium text-gray-700'>Siddhi Vinayak Nagar, Dharangaon</p>
                    </div>
                </div>
                <div className='flex items-center gap-5'>
                    <h3 className='px-2 py-1.5 bg-gray-300 rounded-full'><i className="  ri-map-pin-user-fill"></i></h3>
                    <div className='p-2 leading-tight'>
                        <h4 className='text-lg font-bold'>13/ 89B</h4>
                        <p className='text-base font-medium text-gray-700'>Siddhi Vinayak Nagar, Dharangaon</p>
                    </div>
                </div>
                <div className='flex items-center gap-5'>
                    <h3 className='px-2 py-1.5 bg-gray-300 rounded-full'><i className="  ri-cash-line"></i></h3>
                    <div className='p-2 leading-tight'>
                        <h4 className='text-lg font-bold'>198.20</h4>
                        <p className='text-base font-medium text-gray-700'>Cash cash</p>
                    </div>
                </div>
                <div>
                    <button onClick={() => {
                        props.setComfirmRide(false)
                        props.setVehicleFound(true)
                        props.setVehiclePanel(false)

                    }} className='text-lg font-medium w-full bg-green-700 rounded-xl p-2'>Comfirm Ride</button>
                </div>
            </div>

        </div>
    )
}

export default ComfirmRide