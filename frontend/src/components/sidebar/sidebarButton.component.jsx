import { Flex, Icon } from "@chakra-ui/react";

const SidebarButton = (props) => {

    const { icon, children, onClickHandler } = props;
    return (
      <Flex
        align="center"
        px="4"
        py="3"
        cursor="pointer"
        role="button"
        onClick={onClickHandler}
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

export default SidebarButton;