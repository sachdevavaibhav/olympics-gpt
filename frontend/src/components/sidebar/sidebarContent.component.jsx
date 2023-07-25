import { Box,VStack,Flex, Icon, Text, Spinner } from "@chakra-ui/react"
import { RiFlashlightFill } from 'react-icons/ri';
import {CgLogOut} from 'react-icons/cg'
import {PiChatDotsFill, PiPlusCircleFill} from 'react-icons/pi'
import SidebarButton from "./sidebarButton.component";
import { logout } from '../../store/user/user.reducer';
import { getChatHistory, newChat } from "../../store/chat/chat.reducer";
import { selectAllChats, selectAllChatsIsLoading } from "../../store/chat/chat.selector";
import { useDispatch, useSelector } from 'react-redux';

const SidebarContent = ({ ...props }) => {
    const dispatch = useDispatch();
    const allChats = useSelector(selectAllChats);
    const isLoading = useSelector(selectAllChatsIsLoading);

    const onClickHandler = () => {
      dispatch(logout());
    }
    const loadChatHistory = (e) => {
        dispatch(getChatHistory(e.target.id))
    }
    const createNewChat = () => {
        dispatch(newChat())
    }
    return ( 
        <Box as="nav" pos="fixed" top="0" left="0" zIndex="sticky" h="full" overflowX="hidden" overflowY="auto" bg="#0E1525" w="60" {...props}>
            <VStack h="full" w="full" alignItems="center" justify="space-between">
                <Box w="full">
                    <Flex px="4" py="5" align="center">
                        <Icon as={RiFlashlightFill} h={8} w={8} />
                        <Text fontSize="2xl" ml="2" color="white" fontWeight="semibold"> 
                            OlympicGPT
                        </Text>
                    </Flex>
                </Box>
                <Box w="full" mb="5">
                    <SidebarButton icon={PiPlusCircleFill} onClickHandler={createNewChat}>New Chat</SidebarButton>
                </Box>
                <Box w="full" mb="5" overflowY="scroll" marginBottom="auto" textAlign="center">
                    {
                        isLoading ? <Spinner /> : 
                        allChats.map((chat, idx) => {
                            return (
                                <Box key={idx} onClick={loadChatHistory}>
                                    <SidebarButton icon={PiChatDotsFill} id={chat.chatId}>{chat.chatId}</SidebarButton>
                                </Box>
                            )
                        })
                    }
                    {/* <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton> */}
                </Box>
                <Box w="full" mb="5">
                    <Flex
                        direction="column"
                        as="nav"
                        fontSize="md"
                        color="white"
                        aria-label="logout"
                    >
                        <SidebarButton icon={CgLogOut} onClickHandler={onClickHandler}>Logout</SidebarButton>
                    </Flex>
                </Box>

            </VStack>
        </Box>
    )
};

export default SidebarContent