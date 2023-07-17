import { Box, Avatar, Wrap, WrapItem, Flex, Text } from "@chakra-ui/react";

/*
message: {
    text: "Hello",
    role: "system", // system, user
}
*/
const Message = ({message, role}) => {
    return (
        <Flex alignItems="center" mb="3" w="100%" justify="center" bgColor={role=="assistant"?"#1D283D":"inherit"} py="3">
            <Wrap mr="5" alignSelf="start">
                <WrapItem>
                    <Avatar name={role==="assistant"?"Bot":"Vaibhav Sachdeva"}/>
                </WrapItem>
            </Wrap>
            <Box w="40%">
                <Text>
                    {message}
                </Text>
            </Box>
        </Flex>
    );
}

export default Message;