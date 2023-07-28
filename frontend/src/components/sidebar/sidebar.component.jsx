import {
  Box,
  Drawer,
  DrawerContent,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  Flex,
  Text,
} from '@chakra-ui/react';
import SidebarContent from './sidebarContent.component';
import olympicLamp from '../../assets/torch.svg';

// Here we have used react-icons package for the icons
import { FiMenu } from 'react-icons/fi';
  
const SideBar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Box as="section">
      <SidebarContent display={{ base: 'none', md: 'block' }} />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none"/>
        </DrawerContent>
      </Drawer>
      <Flex ml={{ base: 0, md: 60 }} display={{base:"flex", md:"none"}} transition=".3s ease" backgroundColor={"#0E1525"} p="2">
          <IconButton
            backgroundColor={"#0E1525"}
            aria-label="Menu"
            display={{ base: 'inline-flex', md: 'none' }}
            onClick={onOpen}
            icon={<FiMenu color='white' size="1.5rem"/>}
            size="md"
          />
          <Flex mx="auto">
            <img src={olympicLamp} alt="Olympic Lamp" width="40" height="40"/>
            <Text color="white" fontSize="2xl" fontWeight="semibold">
              OlympicsGPT
            </Text>
          </Flex>
      </Flex>
    </Box>
  );
  }


export default SideBar;