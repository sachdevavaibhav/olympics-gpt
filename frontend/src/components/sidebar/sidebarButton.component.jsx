import { Flex, Icon, Text } from "@chakra-ui/react";

const SidebarButton = (props) => {

    const { icon, children, onClickHandler } = props;
    return (
      <Flex
        align="center"
        px="4"
        py="3"
        cursor="pointer"
        role="button"
        id={props.id}
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
            boxSize="6"
            _groupHover={{
              color: "white"
            }}
            as={icon}
          />
        )}
        <Text style={{whiteSpace: "nowrap", textOverflow: "ellipsis"}} overflow="hidden" id={props.id}>
          {children}
        </Text>
      </Flex>
    );
  };

export default SidebarButton;