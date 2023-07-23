import {FormControl, FormLabel, FormHelperText, Input,Spinner ,Box, Heading, Button, Text} from '@chakra-ui/react'
import {useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../store/user/user.reducer.js'
import {selectUser, selectUserError, selectIsLoading, selectSuccess} from '../../store/user/user.selector.js'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

const Login = () => {
    const [formData, setFormData] = useState({})
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const registerError = useSelector(selectUserError)
    const isLoading = useSelector(selectIsLoading)
    const registerSuccess = useSelector(selectSuccess)
    const navigate = useNavigate()
    const toast = useToast()

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

    useEffect(() => {
        if (registerError) {
            toast({
                title: "An error occurred.",
                description: registerError.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
        if (registerSuccess) {
            toast({
                title: "Login Successful.",
                description: "You have successfully logged in.",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
    }, [registerError, registerSuccess])

    return (
        <>
        {isLoading? <Spinner /> : 
            <FormControl id="login" as="form" display="flex" flexDir="column" justifyContent="center" alignItems="center" onSubmit={handleSubmit}>
                <Box mb="5">
                    <Heading size="lg">Login to continue</Heading>
                </Box>
                <Box bgColor="#1D283D" p="10" borderRadius="1rem" boxShadow="0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)">
                    <Box mb="3">
                        <FormLabel>Email address</FormLabel>
                        <Input id="loginInput" type='email' name='email' onChange={handleChange} />
                        <FormHelperText color="#84A7A1">We'll never share your email.</FormHelperText>
                    </Box>
                    <Box mb="3">
                        <FormLabel>Password</FormLabel>
                        <Input type='password' name='password' onChange={handleChange} />
                        <FormHelperText color="#84A7A1">We'll never share your password.</FormHelperText>
                    </Box>
                    <Button mb="3" backgroundColor="#3AA6B9" color="white" type="submit" _hover={{backgroundColor: "#3AA6B9", opacity: "0.8"}}>Login</Button>
                    <Box>
                        <Text>Don't have an account? <Link to="/auth/signup"><span style={{color:"#3AA6B9"}}>Sign Up</span></Link></Text>
                    </Box>
                </Box>
            </FormControl>
        }
        </>
    )
}

export default Login