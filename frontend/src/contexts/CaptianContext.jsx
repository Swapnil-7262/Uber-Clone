import React, { useState, createContext, useContext } from 'react'
// import { useNavigate } from 'react-router-dom'

export const CaptainDataContext = createContext()

const CaptianContext = ({ children }) => {
    const [captain, setCaptain] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const updateCaptain = ({ captainData }) => {
        setCaptain(captainData)
    }

    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
}

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    )
}

export default CaptianContext