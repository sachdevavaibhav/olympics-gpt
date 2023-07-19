import { Flex, Box } from "@chakra-ui/react"
import SideBar from "../../components/sidebar/sidebar.component"
import Chat from "../../components/chat/chat.component"
import ChatInput from "../../components/chatInput/chatInput.component"

const ChatPage = () => {
    return (
        <Flex justify="center">
            <SideBar />
            <Box pos="relative" overflowX="hidden" w="100%">
                <Chat />
                <ChatInput />
            </Box>
        </Flex>
    )
}

export default ChatPage;