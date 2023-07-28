import { Flex, Text, Heading,Box, Image } from "@chakra-ui/react";
import olympicLogo from "../../assets/olympic.png"
import { useDispatch } from "react-redux";
import { addMessage, getMessageResponse } from "../../store/chat/chat.reducer";

const ChatExample = () => {
    const dispatch = useDispatch()
    const onExampleClick = (query) => {
        dispatch(addMessage({role: "user", text: query}))
        dispatch(getMessageResponse(query))
    }
    const examples = [
        "Who is Neeraj Chopra?",
        "Who won the gold medal in gymnastics all-around at the 2020 Tokyo Olympics for the women's category?",
        "What is synchronised swimming?",
        "Which sport involves performing acrobatic maneuvers on a snowboard or skis and is usually done in a terrain park?",
    ]
    return(
        <Flex flexDirection="column" alignItems="center" justify="center" h="full">
            <Box textAlign="center">
                <Heading>OlympicsGPT</Heading>
                <Text>Ask anything about Olympics</Text>
            </Box>
            <Box textAlign="center" mt="5">
                <Text>Try asking me-</Text>
            </Box>
            <Flex mt="10">
                <Box>

                    <Flex alignItems="center" justify="center" px="3" w="15rem" textAlign="center" 
                    border="" m="8" h="8.5rem" borderRadius="5px" backgroundColor="#1D283D"
                    _hover={{cursor: "pointer", backgroundColor: "#0E1525"}}
                    onClick={() => onExampleClick(examples[0])}
                    transition="all 0.2s ease-in-out"
                    >
                        <Text>{examples[0]}</Text>
                    </Flex>

                    <Flex alignItems="center" justify="center" px="3" w="15rem" textAlign="center" 
                    border="" m="8" h="8.5rem" borderRadius="5px" backgroundColor="#1D283D"
                    _hover={{cursor: "pointer", backgroundColor: "#0E1525"}}
                    onClick={() => onExampleClick(examples[1])}
                    transition="all 0.2s ease-in-out"
                    >
                        <Text>{examples[1]}</Text>
                    </Flex>

                </Box>
                <Box>

                    <Flex alignItems="center" justify="center" px="3" w="15rem" textAlign="center" 
                    border="" m="8" h="8.5rem" borderRadius="5px" backgroundColor="#1D283D"
                    _hover={{cursor: "pointer", backgroundColor: "#0E1525"}}
                    onClick={() => onExampleClick(examples[2])}
                    transition="all 0.2s ease-in-out"
                    >
                        <Text>{examples[2]}</Text>
                    </Flex>

                    <Flex alignItems="center" justify="center" px="3" w="15rem" textAlign="center" 
                    border="" m="8" h="8.5rem" borderRadius="5px" backgroundColor="#1D283D"
                    _hover={{cursor: "pointer", backgroundColor: "#0E1525"}}
                    onClick={() => onExampleClick(examples[3])}
                    transition="all 0.2s ease-in-out"
                    >
                        <Text>{examples[3]}</Text>
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