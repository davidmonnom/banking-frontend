"use client";

import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import axios from "axios";

export default function LayoutOffline() {
  const login = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          params: {
            source: "web",
          },
        }
      );

      window.location.href = response.data;
    } catch (error) {}
  };

  return (
    <Flex
      h={"100vh"}
      w={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box bg={"bg-secondary"} padding={"30px"} borderRadius={"10px"}>
        <Box>
          <Text>Hey ! Welcome on Cedav</Text>
          <Text fontSize={"sm"} color={"text-secondary"}>
            Your budget application, please log-in
          </Text>
        </Box>
        <HStack mt={"30px"} gap={"50px"}>
          <Button onClick={login}>Login with Google</Button>
        </HStack>
      </Box>
    </Flex>
  );
}
