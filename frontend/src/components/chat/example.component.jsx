import { Flex, Text, Heading,Box } from "@chakra-ui/react";

const ChatExample = () => {
    return(
        <Flex flexDirection="column" alignItems="center" justify="center">
            <Box textAlign="center">
                <Heading>OlympicsGPT</Heading>
                <Text>Ask anything about Olympics</Text>
            </Box>
            <Box textAlign="center" mt="5">
                <Text>Try asking me-</Text>
            </Box>
            <Flex mt="10">
                <Box>
                    <Flex alignItems="center" justify="center" px="3" w="15rem" textAlign="center" border="" m="8" h="5rem" borderRadius="5px" backgroundColor="#3E3F4B">
                        <Text>What is Olympics?</Text>
                    </Flex>
                    <Flex alignItems="center" justify="center" px="3" w="15rem" textAlign="center" border="" m="8" h="5rem" borderRadius="5px" backgroundColor="#3E3F4B">
                        <Text>Who won the most medals in the Olympics till date?</Text>
                    </Flex>
                </Box>
                <Box>
                    <Flex alignItems="center" justify="center" px="3" w="15rem" textAlign="center" border="" m="8" h="5rem" borderRadius="5px" backgroundColor="#3E3F4B">
                        <Text>What is Olympics?</Text>
                    </Flex>
                    <Flex alignItems="center" justify="center" px="3" w="15rem" textAlign="center" border="" m="8" h="5rem" borderRadius="5px" backgroundColor="#3E3F4B">
                        <Text>Who won the most medals in the Olympics till date?</Text>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    )
}

export default ChatExample;