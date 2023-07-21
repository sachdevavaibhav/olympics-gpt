import { Flex } from "@chakra-ui/react"
import ChatPage from "./pages/chatPage/chatPage.page"
import AuthPage from "./pages/auth/authPage.page"

const App = () => {
  return (
    <Flex bgColor="#152136" color="#fff" h="100vh">
      {/* <ChatPage /> */}
      <AuthPage />
    </Flex>
  )
}

export default App
