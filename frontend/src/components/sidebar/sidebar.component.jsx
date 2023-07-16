import {
    Avatar,
    Box,
    Flex,
    Icon,
    Text,
    Link,
    Button,
    VStack,
    Drawer,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    DrawerContent,
    IconButton,
    useDisclosure,
    DrawerOverlay,
    useColorModeValue
  } from '@chakra-ui/react';
  // Here we have used react-icons package for the icons
  import { AiOutlineTeam, AiOutlineHome } from 'react-icons/ai';
  import { BsFolder2, BsCalendarCheck } from 'react-icons/bs';
  import { FiMenu } from 'react-icons/fi';
  import { RiFlashlightFill } from 'react-icons/ri';
  
    const SideBar = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
  
    return (
      <Box as="section">
        <SidebarContent display={{ base: 'none', md: 'unset' }} />
        <Drawer isOpen={isOpen} onClose={onClose} placement="left">
          <DrawerOverlay />
          <DrawerContent>
            <SidebarContent w="full" borderRight="none" />
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
  
  const SidebarContent = ({ ...props }) => (
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
        <Box w="full">
          <Flex px="4" py="5" align="center">
            <Icon as={RiFlashlightFill} h={8} w={8} />
            <Text
              fontSize="2xl"
              ml="2"
              color={useColorModeValue('brand.500', 'white')}
              fontWeight="semibold"
            >
              OlympicGPT
            </Text>
          </Flex>
          <Flex
            direction="column"
            as="nav"
            fontSize="md"
            color="white"
            aria-label="Main Navigation"
          >
            <NavItem icon={AiOutlineHome}>Dashboard</NavItem>
            <NavItem icon={AiOutlineTeam}>Team</NavItem>
            <NavItem icon={BsFolder2}>Projects</NavItem>
            <NavItem icon={BsCalendarCheck}>Calendar</NavItem>
          </Flex>
        </Box>
  
        <Flex px="4" py="5" mt={10} justify="center" alignItems="center">
          <Menu>
            <MenuButton
              as={Button}
              size={'sm'}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              _hover={{ textDecoration: 'none' }}
            >
              <Avatar
                size={'sm'}
                name="Ahmad"
                src="https://avatars2.githubusercontent.com/u/37842853?v=4"
              />
            </MenuButton>
            <MenuList fontSize={17} zIndex={5555}>
              <MenuItem as={Link} to="#">
                My profile
              </MenuItem>
              <MenuItem as={Link} to="#">
                Change password
              </MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </VStack>
    </Box>
  );
  
  const NavItem = (props) => {

    const { icon, children } = props;
    return (
      <Flex
        align="center"
        px="4"
        py="3"
        cursor="pointer"
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        _hover={{
          bg: "#1D283D"
        }}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color: "white"
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

export default SideBar;