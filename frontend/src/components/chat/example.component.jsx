import { Flex, Text, Heading,Box, Image } from "@chakra-ui/react";
import olympicLogo from "../../assets/olympic.png"

const ChatExample = () => {
    return(
        <Flex flexDirection="column" alignItems="center" justify="center" h="100vh">
            <Box textAlign="center">
                <Heading>OlympicsGPT</Heading>
                <Text>Ask anything about Olympics</Text>
            </Box>
            <Box textAlign="center" mt="5">
                <Text>Try asking me-</Text>
            </Box>
            <Flex mt="10">
                <Box>
                    <Flex alignItems="center" justify="center" px="3" w="15rem" textAlign="center" border="" m="8" h="5rem" borderRadius="5px" backgroundColor="#1D283D">
                        <Text>What is Olympics?</Text>
                    </Flex>
                    <Flex alignItems="center" justify="center" px="3" w="15rem" textAlign="center" border="" m="8" h="5rem" borderRadius="5px" backgroundColor="#1D283D">
                        <Text>Who won the most medals in the Olympics till date?</Text>
                    </Flex>
                </Box>
                <Box>
                    <Flex alignItems="center" justify="center" px="3" w="15rem" textAlign="center" border="" m="8" h="5rem" borderRadius="5px" backgroundColor="#1D283D">
                        <Text>What is Olympics?</Text>
                    </Flex>
                    <Flex alignItems="center" justify="center" px="3" w="15rem" textAlign="center" border="" m="8" h="5rem" borderRadius="5px" backgroundColor="#1D283D">
                        <Text>Who won the most medals in the Olympics till date?</Text>
                    </Flex>
                </Box>
            </Flex>
            <Box mt="10">
                <Image src={olympicLogo} alt="olympic logo" w="40" />
            </Box>
        </Flex>
    )
}

export default ChatExample;