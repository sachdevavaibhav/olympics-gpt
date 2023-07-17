import { Flex, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../../store/chat/chat.reducer";

const ChatInput = () => {
    const [query, setQuery] = useState('')
    const dispatch = useDispatch()
    const handleChange = (event) => setQuery(event.target.value)
    const handleSubmit = async (e) => {
        console.log(query)
        e.preventDefault()
        dispatch(addMessage({role: "user", text: query}))
        const response = await fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({query})
        })
        const data = await response.json()
        dispatch(addMessage(data.response.queryRes))
    }
    return (
        <Flex justify="center" mt="5" pos="fixed" bottom="10" left="0" right="0">
            <InputGroup size='md' w="50%">
                <Input
                    pr='4.5rem'
                    type='text'
                    placeholder='Ask me anything about Olympics'
                    onChange={handleChange}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' type="submit" onClick={handleSubmit}>
                        Send
                    </Button>
                </InputRightElement>
            </InputGroup>
        </Flex>
    )
}

export default ChatInput;