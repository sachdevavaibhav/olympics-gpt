import ChatExample from "./example.component";
import Message from "../message/message.component";
import { Flex, Box } from "@chakra-ui/react";

let chats = [
    [
        {role: "user", text: "Hello"},
        {role: "system", text: "Hello! How can I help you today?"},
    ],

    [
        {role: "user", text: "Hello"},
        {role: "system", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio fugit odit vel sunt ad, esse porro cum saepe quas. Quas dolorum dolorem quasi, nam voluptatem atque veritatis cum quidem natus. Ex nulla consequatur recusandae error libero sequi voluptatibus numquam totam eos. Animi magni possimus accusamus officiis autem similique, mollitia recusandae provident quia laboriosam iste, corrupti nemo tenetur dolor dolore nisi. Suscipit vero ab dicta. Ad dolorum voluptates. Deleniti, omnis veritatis et dolorum ratione neque nobis veniam dignissimos facere reprehenderit, ad mollitia eius aliquid debitis, ut quod repudiandae tempore animi. Harum ullam eum vero pariatur ab, atque dolorem consequatur, illo, libero perferendis laboriosam quam laudantium porro incidunt! Adipisci nobis quas placeat voluptatem reiciendis, ipsum modi cupiditate molestiae asperiores consectetur veritatis?"}
    ],
]

const Chat = () => {
    return(
        <>
        <Flex justify="center" align="center" flexDirection="column">
            {
                chats.length <= 0 ? <ChatExample /> : chats.map((chat, index) => {
                    return(
                        <Box w="100%" key={index}>
                            {chat.map((message, index) => {
                                return(
                                    <Message key={index} message={message.text} role={message.role} />
                                )
                            })}
                        </Box>
                    )
                })
            }
        </Flex>
        </>
    )
}

export default Chat;

/*
    [
        [
            {role: "user", text: "Hello"},
            {role: "system", text: "Hello! How can I help you today?"},
        ],
        [
            {role: "user", text: "Hello"},
            {role: "system", text: "Hello! How can I help you today?"},
        ],
    ]
*/