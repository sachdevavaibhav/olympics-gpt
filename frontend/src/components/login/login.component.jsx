import {FormControl, FormLabel, FormHelperText, Input, Box, Heading, Button} from '@chakra-ui/react'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {login} from '../../store/user/user.reducer.js'

const Login = () => {
    const [formData, setFormData] = useState({})
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const {email, password} = formData
        dispatch(login({email, password}))
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