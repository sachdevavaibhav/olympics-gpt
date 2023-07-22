import {FormControl, FormLabel, FormHelperText, Input, Box, Heading, Button} from '@chakra-ui/react'
import {useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../store/user/user.reducer.js'
import {selectUser} from '../../store/user/user.selector.js'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [formData, setFormData] = useState({})
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const {email, password} = formData
        dispatch(login({email, password}))
    }
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token && user) {
            navigate("/")
        }
    }, [user])
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