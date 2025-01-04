"use client";

import { AccountableContext } from "@/providers/ContextProvider";
import { VStack } from "@chakra-ui/react";
import { useContext } from "react";

export default function Budget() {
  const context = useContext(AccountableContext);

  return (
    <VStack
      h={"100%"}
      padding={{ base: "15px 10px", md: "15px 30px" }}
      overflow={"hidden"}
    >
      Hey
    </VStack>
  );
}
