import { Flex, Input, InputGroup, InputRightElement, Button, Spinner, Image, Text, Box } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, getMessageResponse } from "../../store/chat/chat.reducer";
import { selectChatIsLoading } from "../../store/chat/chat.selector";
import sendIcon from "../../assets/send.svg"

const ChatInput = () => {

    const [query, setQuery] = useState('')
    const isLoading = useSelector(selectChatIsLoading)
    const dispatch = useDispatch()

    const handleChange = (event) => setQuery(event.target.value)

    const handleSubmit = async (e) => {
        if (query === '') return
        e.preventDefault()
        dispatch(addMessage({role: "user", text: query}))
        const response = dispatch(getMessageResponse(query))
        if (response.chat) dispatch(addMessage(response))
        setQuery('')
    }
    return (
        <Flex as="form" alignItems="center" justify="center" flexDir="column" mt="5" pos="absolute" bottom="10" right="0" left="0">
            <InputGroup w="50%">
                <Input
                    p='1.8rem'
                    type='text'
                    placeholder='Ask me anything about Olympics'
                    onChange={handleChange}
                    value={query}
                    size='lg'
                    bgColor="#0E1525"
                    focusBorderColor="#0E1525"
                    borderColor="#0E1525"
                    _hover={{borderColor: "#0E1525"}}
                />
                <InputRightElement width='5rem' height="100%">
                        <Button 
                        h='1.75rem' 
                        size='sm' 
                        type="submit" 
                        onClick={handleSubmit}
                        isLoading={isLoading}
                        spinner={<Spinner/>}
                        bgColor="#0E1525"
                        >
                            <Image src={sendIcon} w="2.3rem"/>
                        </Button>
                </InputRightElement>
            </InputGroup>
            <Box mt="3">
                <Text color="#fff" fontSize="sm">Developed with love by Vaibhav</Text>
            </Box>
        </Flex>
    )
}

export default ChatInput;