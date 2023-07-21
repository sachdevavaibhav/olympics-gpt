import {FormControl, FormLabel, FormHelperText, Input, Box, Heading, Button} from '@chakra-ui/react'
import { useState } from 'react'

const Login = () => {
    const [formData, setFormData] = useState({})
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
    }
    return (
        <FormControl as="form" display="flex" flexDir="column" justifyContent="center" alignItems="center" onSubmit={handleSubmit}>
            <Box mb="5">
                <Heading size="lg">Login</Heading>
            </Box>
            <Box>
                <FormLabel>Email address</FormLabel>
                <Input type='email' name='email' onChange={handleChange} />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </Box>
            <Box>
                <FormLabel>Password</FormLabel>
                <Input type='password' name='password' onChange={handleChange} />
                <FormHelperText>We'll never share your password.</FormHelperText>
            </Box>
            <Button mt="5" colorScheme="teal" type="submit">Login</Button>
        </FormControl>
    )
}

export default Login