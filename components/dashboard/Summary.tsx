import { AccountableContext } from "@/providers/ContextProvider";
import { Flex, Text, HStack } from "@chakra-ui/react";
import { useContext } from "react";
import Link from "next/link";

export default function Summary() {
  const context = useContext(AccountableContext);

  return (
    <HStack overflowX={"scroll"} gap={"30px"} mb={"20px"} pb={"5px"}>
      <SummaryBox
        title={"Transactions"}
        link={"/transaction"}
        value={context.data.transactions.length}
      />

      <SummaryBox
        title={"Incomes"}
        link={"/transaction/income"}
        value={context.data.transactions.filter((t) => t.amount > 0).length}
      />
      <SummaryBox
        title={"Expenses"}
        link={"/transaction/expense"}
        value={context.data.transactions.filter((t) => t.amount <= 0).length}
      />
      <SummaryBox
        title={"Uncategorized"}
        link={"/transaction/uncategorized"}
        value={context.data.transactions.filter((t) => !t.categories).length}
      />
      <SummaryBox title={"Accounts"} link={""} value={context.data.accounts.length} />
      <SummaryBox title={"Categories"} link={"/category"} value={context.data.categories.length} />
      <SummaryBox
        title={"Limits"}
        link={"/category/limit"}
        value={context.data.categories.filter((c) => c.limit).length}
      />
      <SummaryBox title={"Goals"} link={"/economy/goal"} value={context.data.goals.length} />
      <SummaryBox title={"Budgets"} link={"/economy/budget"} value={context.data.budgets.length} />
    </HStack>
  );
}

const SummaryBox = ({
  title,
  link,
  value,
}: {
  title: string;
  link: string;
  value: string | number;
}) => (
  <Link href={link} >
    <Flex
      bg={"bg-secondary"}
      borderRadius={"3px"}
      w={"110px"}
      h={"110px"}
      p={"15px"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <Text fontSize={"3xl"}>{value}</Text>
      <Text fontSize={"sm"} color={"text-secondary"}>
        {title}
      </Text>
    </Flex>
  </Link>
);
