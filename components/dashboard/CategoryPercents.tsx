import { Account } from "@/client";
import { Flex } from "@chakra-ui/react";

interface CategoryPercentsProps {
  account: Account;
}

export default function CategoryPercents({ account }: CategoryPercentsProps) {
  return <Flex gap={"30px"} mb={"30px"}></Flex>;
}
