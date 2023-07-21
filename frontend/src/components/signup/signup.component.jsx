import {FormControl, FormLabel, FormHelperText, Input, Box, Heading, Button} from '@chakra-ui/react'

const SignUp = () => {
    return (
        <FormControl as="form" display="flex" flexDir="column" justifyContent="center" alignItems="center">
            <Box mb="5">
                <Heading size="lg">Sign Up</Heading>
            </Box>
            <Box>
                <FormLabel>Email address</FormLabel>
                <Input type='email' />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </Box>
            <Box>
                <FormLabel>Password</FormLabel>
                <Input type='password' />
                <FormHelperText>We'll never share your password.</FormHelperText>
            </Box>
            <Button mt="5" colorScheme="teal" type="submit">Sign Up</Button>
        </FormControl>
    )
}

export default SignUp