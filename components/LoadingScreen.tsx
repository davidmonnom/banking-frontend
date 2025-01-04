import { Spinner, Text, VStack } from "@chakra-ui/react";

export default function LoadingScreen({ message }: { message: string }) {
  return (
    <VStack
      opacity={"1"}
      bg={"bg-primary"}
      position={"absolute"}
      top={0}
      left={0}
      h={"100vh"}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      zIndex={99999}
    >
      <Spinner size={"xl"} />
      <Text fontSize={"sm"} color={"text-secondary"} mt={"15px"}>
        {message}
      </Text>
    </VStack>
  );
}
