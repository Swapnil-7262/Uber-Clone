import { useContext, useEffect, useState } from "react"
import { UserDataContext } from "../contexts/UserContext"
import { data, useNavigate } from "react-router-dom"
import axios from "axios"

const UserProtectWapper = ({ children }) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserDataContext)
    const [loading, setLoading] = useState(false)
    // console.log("token", token);

    useEffect(() => {

        if (!token) {
            navigate('/login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                // console.log(response);
                const data = response.data.data
                // console.log(data);
                setUser(data)
                setLoading(true)

            }
        }).catch(err => {
            console.log(err);
            localStorage.removeItem('token')
            navigate('/login')
        })

        if(loading){
            return <div>Loading .....</div>
          }
    }, [token])

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWapper