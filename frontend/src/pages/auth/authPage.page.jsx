import { Flex } from "@chakra-ui/react";
import Login from "../../components/login/login.component";
import SignUp from "../../components/signup/signup.component";

const AuthPage = () => {
    return (
        <Flex justify="center" w="full" alignItems="center">
            <Login />
            <SignUp />
        </Flex>
    );
}

export default AuthPage;