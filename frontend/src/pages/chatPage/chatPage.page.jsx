import { Flex } from "@chakra-ui/react"
import SideBar from "../../components/sidebar/sidebar.component"
import Chat from "../../components/chat/chat.component"
import ChatInput from "../../components/chatInput/chatInput.component"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllChats } from "../../store/chat/chat.reducer"
import { selectAllChats } from "../../store/chat/chat.selector"

const ChatPage = () => {
    const dispatch = useDispatch();
    const allChats = useSelector(selectAllChats);

    useEffect(() => {
        console.log("effect all chats fired");
        dispatch(getAllChats());
    }, []);

    // useEffect(() => {
    //     console.log("effect all chats fired");
    //     dispatch(getAllChats());
    // }, [allChats]);

    return (
        <>
        <Flex flexDir={{base:"column", md:"row"}} justify="center" h="full" w="full">
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