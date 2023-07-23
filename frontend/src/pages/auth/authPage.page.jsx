import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const AuthPage = () => {
    return (
        <Flex justify="center" w="full" alignItems="center">
            <Outlet />
        </Flex>
    );
}

export default AuthPage;

// #1D283D