"use client";

import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { AccountableContext } from "@/providers/ContextProvider";
import { UserContext } from "@/providers/UserProvider";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";

interface LayoutOnlineProps {
  children: React.ReactNode;
}

export default function LayoutOnline({ children }: LayoutOnlineProps) {
  const user = useContext(UserContext);
  const context = useContext(AccountableContext);
  const [userSelected, setUserSelected] = useState(false);

  if (context.states.loading || !userSelected) {
    return (
      <Flex
        h={"100vh"}
        w={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box bg={"bg-secondary"} padding={"30px"} borderRadius={"10px"}>
          <Box>
            <Text>Hey ! Welcome back</Text>
            <Text fontSize={"sm"} color={"text-secondary"}>
              Is this your account?
            </Text>
          </Box>
          <HStack mt={"30px"} gap={"50px"}>
            <HStack>
              <Avatar
                name={`${user?.first_name} ${user?.last_name}`}
                src={user?.picture}
              />
              <Box>
                <Text>{`${user?.first_name} ${user?.last_name}`}</Text>
                <Text color={"text-secondary"}>{user?.email}</Text>
              </Box>
            </HStack>
            <Button colorScheme="gold" onClick={() => setUserSelected(true)}>
              {userSelected ? <Spinner /> : "Choose"}
            </Button>
          </HStack>
        </Box>
      </Flex>
    );
  }

  return (
    <HStack w={"100%"} h={"100%"} gap={"0px"}>
      <Box w={"300px"} h={"100%"} display={{ md: "block", base: "none" }}>
        <Sidebar />
      </Box>
      <Box h={"100%"} w={"calc(100% - 300px)"} flex={1}>
        <VStack h={"100%"} w={"100%"} alignItems={"start"} gap={0}>
          <Box
            h={{ md: "70px", base: "140px" }}
            w={"100%"}
            p={"10px 30px 0 30px"}
          >
            <Navbar />
          </Box>
          <Box
            h={{ md: "calc(100% - 70px)", base: "calc(100% - 140px)" }}
            w={"100%"}
          >
            {children}
          </Box>
        </VStack>
      </Box>
      {/* This is the blur overlay when something is refreshing */}
      <Flex
        opacity={context.states.refresh ? "1" : "0"}
        transition={"all 0.2s ease"}
        position={"absolute"}
        backdropFilter="blur(50px)"
        top={"0"}
        left={"0"}
        w={"100%"}
        h={"100%"}
        zIndex={"100"}
        justifyContent={"center"}
        alignItems={"center"}
        pointerEvents={"none"}
      >
        <Spinner size={"xl"} />
      </Flex>
    </HStack>
  );
}
