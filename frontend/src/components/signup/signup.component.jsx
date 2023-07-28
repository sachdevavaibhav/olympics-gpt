import {FormControl, FormLabel, FormHelperText, Input, Box, Heading, Button, Text} from '@chakra-ui/react'
import {useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {register} from '../../store/user/user.reducer.js'
import {selectUser, selectUserError, selectIsLoading, selectSuccess} from '../../store/user/user.selector.js'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import Loader from '../loader/loader.component.jsx'

const SignUp = () => {
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
        dispatch(register({email, password}))
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
                title: "Account created.",
                description: "Your account has been created. Please login to continue.",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
            navigate("/auth/login")
        }
    }, [registerError, registerSuccess])
    
    return (
        // if isLoading is true, show loading animation
        <>
            {isLoading ? <Loader/> :            
                <FormControl id="signup" as="form" display="flex" flexDir="column" justifyContent="center" alignItems="center" onSubmit={handleSubmit}>
                    <Box mb="5">
                        <Heading size="lg">Create your account</Heading>
                    </Box>
                    <Box bgColor="#1D283D" p="10" borderRadius="1rem" boxShadow="0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)">
                        <Box mb="3">
                            <FormLabel>Email address</FormLabel>
                            <Input id="signupInput" type='email' name='email' onChange={handleChange} />
                            <FormHelperText color="#84A7A1">We'll never share your email.</FormHelperText>
                        </Box>
                        <Box mb="3">
                            <FormLabel>Password</FormLabel>
                            <Input type='password' name='password' onChange={handleChange} />
                            <FormHelperText color="#84A7A1">We'll never share your password.</FormHelperText>
                        </Box>
                        <Button mb="3" backgroundColor="#3AA6B9" color="white" type="submit" _hover={{backgroundColor: "#3AA6B9", opacity: "0.8"}}>Sign Up</Button>
                        <Box>
                            <Text>Already have an account? <Link to="/auth/login"><span style={{color:"#3AA6B9"}}>Login</span></Link></Text>
                        </Box>
                    </Box>
                </FormControl>
            }
        </>
    )
}

export default SignUp