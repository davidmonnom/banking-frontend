"use client";

import { AccountableContext } from "@/providers/ContextProvider";
import { Box } from "@chakra-ui/react";
import { useContext } from "react";
import AccountSummary from "@/components/dashboard/AccountSummary";
import Summary from "@/components/dashboard/Summary";
import BudgetAndGoal from "@/components/dashboard/BudgetAndGoal";

export default function Home() {
  const context = useContext(AccountableContext);

  return (
    <Box
      h={"100%"}
      w={"100%"}
      padding={{ base: "15px 10px", md: "15px 30px" }}
      overflowY={"scroll"}
    >
      <Summary />
      {context.data.accounts.map((account) => {
        return (
          <Box key={account.id}>
            <AccountSummary account={account} />
          </Box>
        );
      })}
      <BudgetAndGoal />
    </Box>
  );
}
