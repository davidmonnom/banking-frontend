"use client";

import { Account } from "@/client";
import { AccountableContext } from "@/providers/ContextProvider";
import formatToCurrency from "@/utils/formatToCurrency";
import {
  transactionByDate,
  transactionByDateType,
} from "@/utils/transactionByDate";
import {
  Box,
  Divider,
  Grid,
  GridItem,
  HStack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useContext, useMemo, useState } from "react";
import { IoArrowDownCircle, IoArrowUpCircle } from "react-icons/io5";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  XAxis,
  BarChart,
  Bar,
  Rectangle,
  Tooltip,
} from "recharts";

interface AccountSummaryProps {
  account: Account;
}

export default function AccountSummary({ account }: AccountSummaryProps) {
  const router = useRouter();
  const context = useContext(AccountableContext);
  const [totals, setTotals] = useState({
    income: 0,
    expense: 0,
    salary: 0,
  });
  const pieChartData = useMemo(() => {
    const result = context.data.transactions.reduce(
      (acc, curr) => {
        if (account.id !== curr.accountId) {
          return acc;
        }

        if (curr.amount < 0) {
          acc.expense += curr.amount;
        } else {
          acc.income += curr.amount;
        }

        return acc;
      },
      { expense: 0, income: 0, salary: 0 }
    );
    setTotals(result);
    return [
      {
        name: "Income",
        value: result.income,
        color: "#a8ffa8",
      },
      {
        name: "Expense",
        value: Math.abs(result.expense),
        color: "#ff957e",
      },
      {
        name: "Salary",
        value: result.salary,
        color: "#FFAD2E",
      },
    ];
  }, [context.data.transactions]);

  const barChartData = useMemo(() => {
    const transactions = transactionByDate(context.data.transactions);
    return Object.values(transactions);
  }, [context.data.transactions]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    const t = payload[0]?.payload as transactionByDateType | undefined;
    if (t) {
      return (
        <Box bg={"bg-primary"} p={"7px"} w={"200px"}>
          <HStack w={"100%"} justifyContent={"space-between"}>
            <Text>Date</Text>
            <Tag borderRadius={"3px"}>{t.dateFromatted}</Tag>
          </HStack>
          <HStack mt={"5px"} w={"100%"} justifyContent={"space-between"}>
            <Text>Expense:</Text>
            <Tag bg={"danger-bg"} color={"danger-text"} borderRadius={"3px"}>
              {formatToCurrency(t.expense, "EUR")}
            </Tag>
          </HStack>
          <HStack mt={"5px"} w={"100%"} justifyContent={"space-between"}>
            <Text>Income:</Text>
            <Tag bg={"success-bg"} color={"success-text"} borderRadius={"3px"}>
              {formatToCurrency(t.income, "EUR")}
            </Tag>
          </HStack>
        </Box>
      );
    }

    return null;
  };

  const clickChartBar = (e: any) => {
    context.setters.filter({
      category: 0,
      account: "all",
      type: "all",
      date: e.date.toISODate(),
    });

    router.push(`/transaction`);
    return;
  };

  return (
    <Grid
      templateColumns={{ base: "1fr", xl: "repeat(5, 1fr)" }}
      gap={{ base: "0px", xl: "30px" }}
      mb={"30px"}
    >
      <GridItem
        colSpan={2}
        bg={"bg-secondary"}
        mb={{ base: "30px", xl: "0px" }}
      >
        <Box w={"100%"} p={"10px 20px"} borderRadius={"3px"}>
          <Text>Account Summary</Text>
          <Text fontSize={"xs"} color={"text-secondary"}>
            {account.name}
          </Text>
        </Box>
        <Divider />
        <Box padding={"30px"}>
          <HStack>
            <ResponsiveContainer height={150} width={"50%"}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  innerRadius="70%"
                  stroke="none"
                  outerRadius="100%"
                  paddingAngle={3}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <Box>
              <Text fontSize={"4xl"}>
                {formatToCurrency(account.balances, "EUR")}
              </Text>
              <Text fontSize={"sm"} color={"text-secondary"}>
                Available balance
              </Text>
            </Box>
          </HStack>
          <HStack mt={"35px"} gap={"25px"} justifyContent={"space-around"}>
            <HStack gap={"15px"}>
              <Box
                borderRadius={"3px"}
                p={"10px"}
                bg={"success-bg"}
                color={"success-text"}
              >
                <IoArrowDownCircle size={"20px"} />
              </Box>
              <Box>
                <Text fontSize={"sm"} color={"text-secondary"}>
                  Other Incomes
                </Text>
                <Text fontSize={"xl"}>
                  {formatToCurrency(totals.income || 0, "EUR")}
                </Text>
              </Box>
            </HStack>
            <HStack gap={"15px"}>
              <Box
                borderRadius={"3px"}
                p={"10px"}
                bg={"danger-bg"}
                color={"danger-text"}
              >
                <IoArrowUpCircle size={"20px"} />
              </Box>
              <Box>
                <Text fontSize={"sm"} color={"text-secondary"}>
                  Expense
                </Text>
                <Text fontSize={"xl"}>
                  {formatToCurrency(totals.expense || 0, "EUR")}
                </Text>
              </Box>
            </HStack>
          </HStack>
        </Box>
      </GridItem>
      <GridItem colSpan={3} bg={"bg-secondary"}>
        <Box w={"100%"} p={"10px 20px"} borderRadius={"3px"}>
          <Text>Transaction statistics</Text>
          <Text fontSize={"xs"} color={"text-secondary"}>
            {account.name}
          </Text>
        </Box>
        <Divider />
        <Box padding={"5px"} h={"300px"}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <XAxis
                tickLine={false}
                dataKey="dateFromatted"
                fontSize={"11px"}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="expense"
                fill="#ff957e"
                stackId="a"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
                onClick={clickChartBar}
              />
              <Bar
                dataKey="income"
                fill="#a8ffa8"
                stackId="a"
                activeBar={<Rectangle fill="red" stroke="blue" />}
                onClick={clickChartBar}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </GridItem>
    </Grid>
  );
}
