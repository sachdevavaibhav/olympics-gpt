import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../../store/user/user.selector"

const ProtectectedRoutes = () => {
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token || !user) {
            navigate("/auth")
            return
        }
    }, [user])
    return (
        <>
            <Outlet />
        </>
    )
}

export default ProtectectedRoutes