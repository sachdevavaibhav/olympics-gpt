import ChatExample from "./example.component";
import Message from "../message/message.component";
import { Flex, Box } from "@chakra-ui/react";
import {useSelector} from "react-redux";
import { selectChatMessages } from "../../store/chat/chat.selector";

// let messages = [
//     {role: "user", text: "Hello"},
//     {role: "assistant", text: "Hello! How can I help you today?"},
//     {role: "user", text: "Hello"},
//     {role: "assistant", text: "Hello! How can I help you today?"},
// ]

const Chat = () => {
    const messages = useSelector(selectChatMessages);
    console.log("messages",messages);
    return(
        <>
        <Flex justify="center" align="center" flexDirection="column" h="100%">
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