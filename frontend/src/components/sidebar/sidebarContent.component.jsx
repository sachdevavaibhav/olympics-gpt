import { Box,VStack,Flex, Text, Spinner } from "@chakra-ui/react"
import olympicLamp from '../../assets/torch.svg';
import {CgLogOut} from 'react-icons/cg'
import {PiChatDotsFill, PiPlusCircleFill} from 'react-icons/pi'
import {BiSolidUserCircle} from 'react-icons/bi'
import SidebarButton from "./sidebarButton.component";
import { logout } from '../../store/user/user.reducer';
import { getChatHistory, newChat } from "../../store/chat/chat.reducer";
import { selectAllChats, selectAllChatsIsLoading } from "../../store/chat/chat.selector";
import { selectUser } from "../../store/user/user.selector";
import { useDispatch, useSelector } from 'react-redux';

const SidebarContent = ({ ...props }) => {
    const dispatch = useDispatch();
    const allChats = useSelector(selectAllChats);
    const isLoading = useSelector(selectAllChatsIsLoading);
    const user = useSelector(selectUser);
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
        <Box as="nav" top="0" left="0" zIndex="sticky" h="full" overflowX="hidden" overflowY="auto" bg="#0E1525" w="60" {...props}>
            <VStack h="full" w="full" alignItems="center" justify="space-between">
                <Box w="full">
                    <Flex px="4" py="5" align="center">
                        <img src={olympicLamp} alt="Olympic Lamp" width="40" height="40"/>
                        <Text fontSize="2xl" ml="2" color="white" fontWeight="semibold"> 
                            OlympicsGPT
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
                                    <SidebarButton icon={PiChatDotsFill} id={chat.chatId}>{chat.title}</SidebarButton>
                                </Box>
                            )
                        })
                    }
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
                        <SidebarButton icon={BiSolidUserCircle}>{user?.username}</SidebarButton>
                    </Flex>
                </Box>

            </VStack>
        </Box>
    )
};

export default SidebarContent