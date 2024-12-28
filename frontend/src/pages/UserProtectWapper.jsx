import { useContext, useEffect } from "react"
import { UserDataContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"

const UserProtectWapper = ({ children }) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    // console.log("token", token);

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token, navigate])

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWapper