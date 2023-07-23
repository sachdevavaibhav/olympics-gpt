import { Box,VStack,Flex, Icon, Text } from "@chakra-ui/react"
import { RiFlashlightFill } from 'react-icons/ri';
import {CgLogOut} from 'react-icons/cg'
import SidebarButton from "./sidebarButton.component";
import { logout } from '../../store/user/user.reducer';
import { useDispatch } from 'react-redux';

const SidebarContent = ({ ...props }) => {
    const dispatch = useDispatch();
    const onClickHandler = () => {
      dispatch(logout());
    }
    return ( 
        <Box
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        zIndex="sticky"
        h="full"
        overflowX="hidden"
        overflowY="auto"
        bg="#0E1525"
        w="60"
        {...props}
        >
        <VStack h="full" w="full" alignItems="flex-start" justify="space-between">
            <Box w="full" alignSelf="flex-start">
            <Flex px="4" py="5" align="center">
                <Icon as={RiFlashlightFill} h={8} w={8} />
                <Text
                fontSize="2xl"
                ml="2"
                color="white"
                fontWeight="semibold"
                >
                OlympicGPT
                </Text>
            </Flex>
            </Box>
            <Box w="full" mb="5">
            <Flex
                direction="column"
                as="nav"
                fontSize="md"
                color="white"
                aria-label="Main Navigation"
            >
                <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
            </Flex>
            </Box>

        </VStack>
        </Box>
    )
};

export default SidebarContent