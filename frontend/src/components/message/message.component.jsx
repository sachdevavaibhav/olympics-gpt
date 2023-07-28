import { Box, Avatar, Wrap, WrapItem, Flex } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import olympicLamp from '../../assets/torch.svg';
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.selector";

/*
message: {
    text: "Hello",
    role: "system", // system, user
}
*/
const Message = ({message, role}) => {
    const user = useSelector(selectUser);
    return (
        <Flex alignItems="center" mb="3" w="100%" justify="center" bgColor={role=="assistant"?"#1D283D":"inherit"} py="3">
            <Wrap mr="8" alignSelf="start">
                <WrapItem>
                    {
                        role==="assistant"? <Avatar bg="#464C63" size={{base:"sm", md:"md"}}  src={olympicLamp} name="Olympics Gpt"/> :
                        <Avatar src="" size={{base:"sm", md:"md"}} name={user?.username||"VS"}/>
                    }
                </WrapItem>
            </Wrap>
            <Box w={{base:'65%',md: "70%", lg:"40%"}}>
                <ReactMarkdown>
                    {message}
                </ReactMarkdown>
            </Box>
        </Flex>
    );
}

export default Message;