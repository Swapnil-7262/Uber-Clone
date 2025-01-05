import React from 'react'

const LocatioSearchPanel = (props) => {

  // console.log(props);


  const location = [
    "13, Siddhi Vinayak Nagar, Dharangaon, Jalgaon, Maharashtra",
    "27, Sahil Nagar, Dharangaon, Jalgaon, Maharashtra",
    "25, Ganesh Nagar, Dharangaon, Jalgaon, Maharashtra",
    "14, Sai Baba Nagar, Dharangaon, Jalgaon, Maharashtra",
  ]
  return (
    <div>
      {
        location.map((elem, index) => {
          return <div key={index} onClick={() => {
            props.setVehiclePanel(true)
            props.setPanelOpen(false)
          }
          } className='flex justify-start items-center gap-5 mb-6'>
            <h2 className='p-2 mx-3 bg-[#eee] rounded-full w-12 flex items-center justify-center'>
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className='font-semibold '>{elem}</h4>
          </div>
        })
      }
    </div>
  )
}

export default LocatioSearchPanel