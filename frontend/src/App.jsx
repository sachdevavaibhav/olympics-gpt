import {Routes, Route} from "react-router-dom"
import { Flex } from "@chakra-ui/react"
import ChatPage from "./pages/chatPage/chatPage.page"
import AuthPage from "./pages/auth/authPage.page"
import Login from "./components/login/login.component"
import SignUp from "./components/signup/signup.component"
import ProtectectedRoutes from "./components/protectedRoutes/protectedRoutes.component"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getUser } from "./store/user/user.reducer"
import { useNavigate } from "react-router-dom"

const App = () => {
  // attempt to login if token is present
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/auth/login")
      return
    }
    else {
      dispatch(getUser({token: token}))
    }
  }, [])
  return (
    <Flex bgColor="#152136" color="#fff" h="100vh">
      <Routes>
        <Route path="/auth" element={<AuthPage />}>
          <Route path="login" element={<Login />} />  
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="/" element={<ProtectectedRoutes />}>
          <Route path="" element={<ChatPage />} />
        </Route>
      </Routes>
    </Flex>
  )
}

export default App
