import { useEffect, useRef } from "react";
import ChatExample from "./example.component";
import Message from "../message/message.component";
import { Flex, Box } from "@chakra-ui/react";
import {useSelector} from "react-redux";
import { selectChatMessages, selectChatIsLoading, selectChatError } from "../../store/chat/chat.selector";

// let messages = [
//     {role: "user", text: "Hello"},
//     {role: "assistant", text: "Hello! How can I help you today?"},
//     {role: "user", text: "Hello"},
//     {role: "assistant", text: "Hello! How can I help you today?"},
// ]

const Chat = () => {
    const messages = useSelector(selectChatMessages);
    const isLoading = useSelector(selectChatIsLoading);
    const error = useSelector(selectChatError);
    const chatContainerRef = useRef();

    const scrollToBottom = () => {
        if (chatContainerRef.current){
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            /*
               * Note:
               * The scrollHeight property returns the height of an element including padding, but excluding borders, scrollbars, or margins.
               * The scrollTop property sets or returns the number of pixels an element's content is scrolled vertically.
             */
        }
    }

    useEffect(() => {
        scrollToBottom();
    }, [isLoading])

    useEffect(() => {
        if (error?.payload?.status == 401) {
            window.location.reload();

        }
    }, [error])

    return(
        <>
        <Flex align="center" flexDirection="column" h="100%" overflowY="auto" overflowX="hidden" flex="1" mb="2" ref={chatContainerRef}>
            {
                messages.length <= 0 ? <ChatExample /> : messages.map((message, index) => {
                    return(
                        <Box w="100%" key={index}>
                            <Message key={index} message={message.text} role={message.role} />
                        </Box>
                    )
                })
            }
        </Flex>
        </>
    )
}

export default Chat;