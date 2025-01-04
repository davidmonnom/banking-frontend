import Link from "next/link";
import { Box, Text, Button, HStack, useColorModeValue } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { NavButtonType } from "@/data/data";

interface NavbarButtonProps {
  button: NavButtonType;
}

export default function NavbarButton({ button }: NavbarButtonProps) {
  const path = usePathname();
  const textColor = useColorModeValue("gray.800", "gray.200");
  const colorScheme = useColorModeValue("gold", "gold");
  const isActive = path === button.path;

  return (
    <Link href={button.path}>
      <Box w={"100%"}>
        <Button
          w={"100%"}
          borderRadius={"3px"}
          bg={isActive ? "gold.400" : "transparent"}
          color={isActive ? "gray.800" : textColor}
          colorScheme={colorScheme}
        >
          <HStack w={"100%"}>
            <Box>{<button.icon />}</Box>
            <Text fontWeight={500} fontSize={"sm"}>
              {button.name}
            </Text>
          </HStack>
        </Button>
      </Box>
    </Link>
  );
}
