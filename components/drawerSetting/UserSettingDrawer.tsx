import {
  HStack,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerFooter,
  Box,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AccountableContext } from "@/providers/ContextProvider";
import LinkButton from "../plaid/LinkButton";
import ItemDetailsCard from "./ItemDetailsCard";
import UserSettings from "./UserSettings";
import Link from "next/link";

interface UserSettingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserSettingDrawer({
  isOpen,
  onClose,
}: UserSettingDrawerProps) {
  const context = useContext(AccountableContext);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={"md"}
        trapFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Account settings</DrawerHeader>

          <DrawerBody>
            <Box mb={"30px"}>
              <Text
                fontSize={"xl"}
                fontWeight={300}
                textTransform={"uppercase"}
              >
                Financial Items
              </Text>
              <Text fontSize={"sm"} mb={"15px"} color={"text-secondary"}>
                Manage your linked accounts
              </Text>
              <VStack mb={"10px"}>
                {context.data.items.map((item) => (
                  <ItemDetailsCard item={item} key={item.id} />
                ))}
              </VStack>
              <HStack justifyContent={"start"}>
                <LinkButton />
              </HStack>
            </Box>
            <UserSettings />
          </DrawerBody>

          <DrawerFooter>
            <HStack gap={"10px"}>
              <Link href="/api/auth/logout" prefetch={false}>
                <Button>
                  <Text>Logout</Text>
                </Button>
              </Link>
              <Button variant="outline" mr={3} onClick={onClose}>
                <Text>Close</Text>
              </Button>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
