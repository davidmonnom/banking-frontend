import { Box, HStack, Text } from "@chakra-ui/react";
import { TbInfoSquareRoundedFilled } from "react-icons/tb";

export default function WaitingDisclaimer() {
  return (
    <HStack p={"15px 20px"} gap={"20px"} borderRadius={"3px"} shadow={"sm"}>
      <Box p={"5px"} borderRadius={"3px"} boxShadow={"0px 0px 5px 0px rgba(255,88,82,1)"}>
        <TbInfoSquareRoundedFilled size={"40px"} />
      </Box>
      <Box>
        <Text
          fontSize={"md"}
          mb={"10px"}
        >{`Hey! We've just seen that you've added a bank account.`}</Text>
        <Text
          fontSize={"sm"}
        >{`It's important to know that the first synchronization may take some time, on average 1 to 6 hours.`}</Text>
        <Text
          fontSize={"sm"}
        >{`But don't worry, synchronizations will be faster for new transactions.`}</Text>
      </Box>
    </HStack>
  );
}
