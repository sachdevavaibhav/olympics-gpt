import { Flex, Box } from "@chakra-ui/react"
import SideBar from "../../components/sidebar/sidebar.component"
import Chat from "../../components/chat/chat.component"
import ChatInput from "../../components/chatInput/chatInput.component"
import { useSelector } from "react-redux"
import { selectUser } from "../../store/user/user.selector"
import { useNavigate } from "react-router-dom"

const ChatPage = () => {
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    if (!user) {
        navigate("/auth")
    }
    return (
        <>
        <Flex justify="center" h="full" w="full">
            <SideBar />
            <Flex flexDir="column" justify="space-between" w="full" height="full" flex="1" overflowY="hidden">
                <Chat />    
                <ChatInput />
            </Flex>
        </Flex>
        </>
    )
}

export default ChatPage;