import { HStack, VStack, Image, useColorModeValue } from "@chakra-ui/react";
import SidebarButton from "./SidebarButton";
import RangeSelector from "../RangeSelector";
import { RawNavButtons } from "@/data/data";
import { IoAccessibility } from "react-icons/io5";
import { useContext, useMemo } from "react";
import { AccountableContext } from "@/providers/ContextProvider";

export default function Sidebar() {
  const images = useColorModeValue("/logo_white.png", "/logo_black.png");
  const context = useContext(AccountableContext);
  const navBtns = RawNavButtons();
  const stats = useMemo(() => {
    const historyAmount = context.data.transactionsHistory.reduce(
      (acc, curr) => {
        if (curr.amount < 0) {
          acc.expense += curr.amount;
        } else {
          acc.income += curr.amount;
        }
        return acc;
      },
      { expense: 0, income: 0 }
    );

    const currentAmount = context.data.transactions.reduce(
      (acc, curr) => {
        if (curr.amount < 0) {
          acc.expense += curr.amount;
        } else {
          acc.income += curr.amount;
        }
        return acc;
      },
      { expense: 0, income: 0 }
    );

    return {
      history: historyAmount,
      current: currentAmount,
    };
  }, [context.data.transactionsHistory, context.data.transactions]);

  return (
    <VStack
      width={"100%"}
      height={"100%"}
      bg={"bg-secondary"}
      justifyContent={"space-between"}
      shadow={{ base: "none", md: "sm" }}
      padding={{ md: "10px 20px", base: "none" }}
      overflowY={"scroll"}
    >
      <HStack w={"100%"}>
        <Image src={`/image/${images}`} alt="logo" w={"100%"} color={"white"} />
      </HStack>
      <VStack w={"100%"}>
        {navBtns.map((button) => {
          return (
            <SidebarButton key={button.id} button={button} stats={stats} />
          );
        })}
        <SidebarButton
          stats={stats}
          button={{
            id: 1997,
            name: "Admin",
            description: "Admin",
            icon: IoAccessibility,
            path: "/admin",
            children: [],
          }}
        />
      </VStack>
      <RangeSelector />
    </VStack>
  );
}
