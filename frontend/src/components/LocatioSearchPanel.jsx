import React, { useEffect } from 'react'

const LocatioSearchPanel = ({ suggestions, setPickup, setDestination, activeField }) => {

  // useEffect(() => {
  //   console.log("suggestions", suggestions); // This logs whenever 'suggestions' is updated
  // }, [suggestions]);

  const handleSuggestionClick = (suggestion) => {
    
    if (activeField === "pickup") {
      setPickup(suggestion.address.freeformAddress);
    } else if (activeField === "destination") {
      setDestination(suggestion.address.freeformAddress);
    }
  };

  return (
    <div>
      {/* Display fetched suggestions */}
      {
        suggestions.map((elem, idx) => {
          return <div key={idx}
            onClick={() => handleSuggestionClick(elem)} className='mx-5 flex gap-7 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
            <h2 className='bg-[#eee] px-1  flex items-center justify-center rounded-full'><i className="text-base ri-map-pin-fill"></i></h2>
            <h4 className='font-medium'>{elem.address.freeformAddress}</h4>
          </div>
        })
      }
    </div>
  );
};

export default LocatioSearchPanel