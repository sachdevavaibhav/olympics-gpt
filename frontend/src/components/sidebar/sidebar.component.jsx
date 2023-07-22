import {
  Box,
  Drawer,
  DrawerContent,
  IconButton,
  useDisclosure,
  DrawerOverlay,
} from '@chakra-ui/react';
import SidebarContent from './sidebarContent.component';

// Here we have used react-icons package for the icons
import { FiMenu } from 'react-icons/fi';
  
const SideBar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Box as="section">
      <SidebarContent display={{ base: 'none', md: 'unset' }} />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none"/>
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
          <IconButton
            aria-label="Menu"
            display={{ base: 'inline-flex', md: 'none' }}
            onClick={onOpen}
            icon={<FiMenu />}
            size="md"
          />
      </Box>
    </Box>
  );
  }


export default SideBar;