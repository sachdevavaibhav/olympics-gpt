import {Routes, Route} from "react-router-dom"
import { Flex } from "@chakra-ui/react"
import ChatPage from "./pages/chatPage/chatPage.page"
import AuthPage from "./pages/auth/authPage.page"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getUser } from "./store/user/user.reducer"
import { useNavigate } from "react-router-dom"

const App = () => {
  // define a useeffect to check if the user is logged in or not
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/auth")
      return
    }
    else {
      dispatch(getUser({token: token}))
    }
  }, [])

  return (
    <Flex bgColor="#152136" color="#fff" h="100vh">
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Flex>
  )
}

export default App
