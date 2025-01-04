import {
  HStack,
  Box,
  Spinner,
  Tooltip,
  Text,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AccountableContext } from "@/providers/ContextProvider";
import NavbarAvatar from "./NavbarAvatar";
import { usePathname } from "next/navigation";
import NavbarButton from "./NavbarButton";
import NavbarRangeModal from "./NavbarRangeModal";
import { RawNavButtons } from "@/data/data";
import { currentPathDetails } from "@/utils/currentPathDetails";

export default function Navbar() {
  const pathName = usePathname();
  const context = useContext(AccountableContext);
  const navBtns = RawNavButtons();
  const curBtn = currentPathDetails(pathName);

  return (
    <VStack w={"100%"} h={"100%"} overflow={"hidden"}>
      <HStack
        overflow={"hidden"}
        justifyContent={"space-between"}
        alignItems={"center"}
        h={"70px"}
        w={"100%"}
      >
        <HStack gap={"10px"}>
          <Box>
            <Text>{curBtn?.name}</Text>
            <Text fontSize={"xs"} color={"text-secondary"}>
              {curBtn?.description}
            </Text>
          </Box>
        </HStack>
        <HStack gap={"20px"}>
          {context.states.backLoading && (
            <Tooltip
              label={"Some transactions are currently loaded in background"}
              cursor={"pointer"}
            >
              <Box>
                <Spinner />
              </Box>
            </Tooltip>
          )}
          <NavbarAvatar />
        </HStack>
      </HStack>
      <Divider display={{ md: "none", base: "block" }} />
      <Box w={"100%"} h={"65px"} display={{ md: "none", base: "block" }}>
        <HStack flex={1} w={"100%"} mt={"10px"} overflowX={"scroll"} pb={"5px"}>
          <NavbarRangeModal />
          {navBtns.map((button) => (
            <NavbarButton key={button.id} button={button} />
          ))}
        </HStack>
      </Box>
    </VStack>
  );
}
