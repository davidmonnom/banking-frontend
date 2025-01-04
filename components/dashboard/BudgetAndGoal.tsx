"use client";

import { Budget, Goal, Transaction } from "@/client";
import { AccountableContext } from "@/providers/ContextProvider";
import { Box, Divider, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useMemo } from "react";
import Wave from "react-wavify";

const containerHeight = 200;
const bgColor = [
  "#ff8a8a",
  "#ff957e",
  "#ffa174",
  "#ffaf6d",
  "#f7bd6a",
  "#edcb6b",
  "#e0d972",
  "#d0e77f",
  "#bdf391",
  "#a8ffa8",
];

const textColor = [
  "#430000",
  "#480900",
  "#4a1400",
  "#4b1e00",
  "#492800",
  "#453200",
  "#3e3c00",
  "#344500",
  "#254e00",
  "#045600",
];

type BudgetType = {
  amount: number;
  transactions: Transaction[];
};

export default function BudgetAndGoal() {
  const context = useContext(AccountableContext);
  const { transactionByBudget, transactionbByGoal } = useMemo(() => {
    const transactionByBudget = {} as { [key: string]: BudgetType };
    const transactionbByGoal = {} as { [key: string]: BudgetType };

    for (const transaction of [
      ...context.data.transactionsOut,
      ...context.data.transactions,
    ]) {
      if (transaction.budgets.length === 0 && transaction.goals.length === 0) {
        continue;
      }

      for (const budget of transaction.budgets) {
        if (!transactionByBudget[budget.id]) {
          transactionByBudget[budget.id] = {
            amount: 0,
            transactions: [],
          };
        }

        transactionByBudget[budget.id].amount += -transaction.amount;
        transactionByBudget[budget.id].transactions.push(transaction);
      }

      for (const goal of transaction.goals) {
        if (!transactionbByGoal[goal.id]) {
          transactionbByGoal[goal.id] = {
            amount: 0,
            transactions: [],
          };
        }

        transactionbByGoal[goal.id].amount += -transaction.amount;
        transactionbByGoal[goal.id].transactions.push(transaction);
      }
    }

    return {
      transactionByBudget,
      transactionbByGoal,
    };
  }, [context.data.transactions, context.data.budgets]);

  const computePercent = (rec: Budget | Goal) => {
    const budgetAmount = rec.amount;
    const transactionAmount =
      transactionByBudget[rec.id]?.amount ||
      transactionbByGoal[rec.id]?.amount ||
      0;
    const percent = (transactionAmount / budgetAmount) * 100;

    return Math.round(percent);
  };

  const getColor = (rec: Budget | Goal) => {
    const percent = computePercent(rec); // we should round this to be able to use it as an index
    const index = Math.round(percent / 10);

    if (index > 9) {
      return {
        bg: bgColor[9],
        text: textColor[9],
      };
    }

    return {
      bg: bgColor[index],
      text: textColor[index],
    };
  };

  const computeHeight = (rec: Budget | Goal) => {
    const budgetAmount = rec.amount;
    const transactionAmount =
      transactionByBudget[rec.id]?.amount ||
      transactionbByGoal[rec.id]?.amount ||
      0;
    const percent = (transactionAmount / budgetAmount) * 100;

    return `${percent}%`;
  };

  useEffect(() => {
    const waves = [...context.data.goals, ...context.data.budgets].map(
      (rec) => {
        const svg = document.getElementById(`${rec.id}-wave`);
        return svg;
      }
    );

    // Set SVG height to 10
    for (const wave of waves) {
      if (wave) {
        wave.setAttribute("height", "20");
      }
    }
  }, [context.data.goals, context.data.budgets]);

  return (
    <Box w={"100%"} bg={"bg-secondary"}>
      <Box w={"100%"} p={"10px 20px"} borderRadius={"3px"}>
        <Text>Budget & Goals</Text>
        <Text fontSize={"xs"} color={"text-secondary"}>
          {`Plus la box est remplie, plus vous avez économisé par rapport à la
          somme ciblée par l'objectif ou le budget.`}
        </Text>
      </Box>
      <Divider />
      <HStack
        w={"100%"}
        h={`${containerHeight}px`}
        gap={"30px"}
        padding={"15px"}
        overflowX={"scroll"}
        overflowY={"hidden"}
      >
        {[...context.data.goals, ...context.data.budgets]
          .sort((a, b) => computePercent(b) - computePercent(a))
          .map((b) => (
            <Box key={b.id} h={"100%"} position={"relative"}>
              <Flex
                h={"100%"}
                w={"140px"}
                bg={"bg-primary"}
                overflow={"hidden"}
                flexDir={"column"}
                justifyContent={"flex-end"}
                borderRadius={"10px"}
              >
                <VStack w={"100%"} h={computeHeight(b)} gap={"0"}>
                  <Wave
                    svgId={`${b.id}-wave`}
                    paused={false}
                    fill={getColor(b).bg}
                    style={{ display: "flex" }}
                    options={{
                      height: 1,
                      amplitude: 7,
                      speed: 0.3,
                      points: 3,
                    }}
                  />
                  <Box
                    bg={getColor(b).bg}
                    w={"100%"}
                    flexGrow={1}
                    margin={0}
                    padding={0}
                  />
                </VStack>
              </Flex>
              <Flex
                position={"absolute"}
                w={"100%"}
                top={"50%"}
                transform={"translateY(-50%)"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Box
                  boxShadow={"0px 5px 15px -7px #000000"}
                  bg={getColor(b).bg}
                  color={getColor(b).text}
                  textAlign={"center"}
                  padding={"5px 10px"}
                  borderRadius={"15px"}
                >
                  <Text fontSize={"2xl"} noOfLines={1}>
                    {`${computePercent(b)}%`}
                  </Text>
                  <Text fontSize={"xs"}>{b.name}</Text>
                </Box>
              </Flex>
            </Box>
          ))}
      </HStack>
    </Box>
  );
}
