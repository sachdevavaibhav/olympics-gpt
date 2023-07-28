import { Box, Avatar, Wrap, WrapItem, Flex } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import olympicLamp from '../../assets/torch.svg';

/*
message: {
    text: "Hello",
    role: "system", // system, user
}
*/
const Message = ({message, role}) => {
    return (
        <Flex alignItems="center" mb="3" w="100%" justify="center" bgColor={role=="assistant"?"#1D283D":"inherit"} py="3">
            <Wrap mr="8" alignSelf="start">
                <WrapItem>
                    {
                        role==="assistant"? <Avatar bg="#464C63" src={olympicLamp} name="Olympics Gpt"/> :
                        <Avatar src="" name="Vaibhav Sachdeva"/>
                    }
                </WrapItem>
            </Wrap>
            <Box w="40%">
                <ReactMarkdown>
                    {message}
                </ReactMarkdown>
            </Box>
        </Flex>
    );
}

export default Message;