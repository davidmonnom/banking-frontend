import {
  Avatar,
  Box,
  HStack,
  useDisclosure,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import UserSettingDrawer from "../drawerSetting/UserSettingDrawer";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useContext } from "react";
import { UserContext } from "@/providers/UserProvider";

export default function NavbarAvatar() {
  const user = useContext(UserContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={toggleColorMode} colorScheme="blue">
        {colorMode === "light" ? <FaMoon /> : <FaSun />}
      </Button>
      <HStack cursor={"pointer"} onClick={onOpen}>
        {user && (
          <>
            <Box textAlign={"right"} display={{ base: "none", md: "block" }}>
              <Text>{`${user.first_name} ${user.last_name}`}</Text>
              <Text fontSize={"xs"} color={"text-secondary"}>
                {user.email}
              </Text>
            </Box>
            <Avatar name={user.last_name || ""} src={user.picture || ""} />
          </>
        )}
      </HStack>
      <UserSettingDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
}
