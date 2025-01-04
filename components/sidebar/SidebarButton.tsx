"use client";

import Link from "next/link";
import { Box, Text, HStack, useColorModeValue, Spacer } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { NavButtonType } from "@/data/data";
import { useContext, useMemo } from "react";
import { AccountableContext } from "@/providers/ContextProvider";
import StatsIndicator from "../StatsIndicator";
import { currentPathDetails } from "@/utils/currentPathDetails";

interface SidebarButtonProps {
  button: NavButtonType;
  stats: {
    history: {
      income: number;
      expense: number;
    };
    current: {
      income: number;
      expense: number;
    };
  };
}

export default function SidebarButton({ stats, button }: SidebarButtonProps) {
  const path = usePathname();
  const textColor = useColorModeValue("gray.800", "gray.200");
  const context = useContext(AccountableContext);
  const bgColor = useColorModeValue("blackAlpha.100", "blackAlpha.300");
  const curBtn = currentPathDetails(path);

  const printBtn = (btn: NavButtonType, spacing: number): JSX.Element[] => {
    const jsxBox = [] as JSX.Element[];

    jsxBox.push(
      <Link href={btn.path} key={btn.id}>
        <Box
          w={"100%"}
          ml={`${spacing}px`}
          color={textColor}
          borderRadius={"3px"}
          padding={"3px"}
          mt={"5px"}
          bg={"none"}
          transition={"all 0.2s ease-in-out"}
          _hover={{
            bg: bgColor,
          }}
        >
          <HStack w={"100%"} alignItems={"center"} borderRadius={"3px"}>
            <Box
              bg={curBtn?.id === btn.id ? "gold.600" : "none"}
              p={"5px"}
              borderRadius={"3px"}
            >
              {<btn.icon />}
            </Box>
            <Text fontWeight={500} fontSize={"sm"}>
              {btn.name}
            </Text>
            <Spacer />
            {btn.id === 23 && ( // Uncategorized
              <HStack gap={"5px"}>
                <Box
                  bg={"danger-bg"}
                  h={"9px"}
                  aspectRatio={1}
                  borderRadius={"999px"}
                />
                <Text fontSize={"xs"}>
                  {context.data.transByCategId[-1]?.nbrTransactions}
                </Text>
              </HStack>
            )}
          </HStack>
        </Box>
      </Link>
    );

    if (btn.children) {
      spacing += 10;
      jsxBox.push(
        ...btn.children.map((child) => printBtn(child, spacing)).flat()
      );
    }

    return jsxBox;
  };

  return (
    <Box marginBottom={"20px"} w={"100%"} borderRadius={"3px"} key={button.id}>
      {printBtn(button, 0)}
    </Box>
  );
}
