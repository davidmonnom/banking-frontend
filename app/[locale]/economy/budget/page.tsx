"use client";

import EditModal from "@/components/modal/EditModal";
import { BudgetEditableParams } from "@/data/data";
import { AccountableContext } from "@/providers/ContextProvider";
import { computeStartMonth } from "@/utils/budgetDateRange";
import formatToCurrency from "@/utils/formatToCurrency";
import { DateTime } from "luxon";
import { useContext, useMemo } from "react";
import { FaPencil } from "react-icons/fa6";
import { IoCalendarSharp } from "react-icons/io5";
import DeleteModal from "@/components/modal/DeleteModal";
import { FaInfoCircle, FaTrash } from "react-icons/fa";
import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  SimpleGrid,
  Spacer,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useI18n } from "@/locales/client";
import { BudgetService, Budget as BudgetType, Transaction } from "@/client";

type BudgetTypeAcc = {
  amount: number;
  transactions: Transaction[];
};

export default function Budget() {
  const t = useI18n();
  const context = useContext(AccountableContext);
  const editableParams = BudgetEditableParams();
  const transactionByBudget = useMemo(() => {
    const budgetByIds = context.data.budgets.reduce((acc, b) => {
      acc[b.id] = b;
      return acc;
    }, {} as { [key: string]: BudgetType });

    return [...context.data.transactionsOut, ...context.data.transactions]
      .filter((t) => t.budgets.length > 0)
      .reduce((acc, t: Transaction) => {
        for (const b of t.budgets) {
          const budget = budgetByIds[b.id];
          const transactionDate = DateTime.fromSQL(t.date);
          const computed = computeStartMonth(budget);

          if (transactionDate < computed.startDate) {
            continue;
          }

          if (!acc[b.id]) {
            acc[b.id] = {
              amount: 0,
              transactions: [],
            };
          }

          // Inverse the amount if the transaction is an expense
          acc[b.id].amount += -t.amount;
          acc[b.id].transactions.push(t);
        }

        return acc;
      }, {} as { [key: string]: BudgetTypeAcc });
  }, [context.data.transactions, context.data.budgets]);

  const callback = async (data: BudgetType) => {
    if (data.id) {
      const budgets = await BudgetService.updateBudgetBudgetIdPut({
        budgetId: data.id,
        requestBody: data,
      });
      context.setters.budgets((prev) =>
        prev.map((b) => (b.id === data.id ? budgets : b))
      );
    } else {
      data.groupId = context.data.groups[0].id;
      const budgets = await BudgetService.createBudgetPost({
        requestBody: data,
      });
      context.setters.budgets((prev) => [...prev, budgets]);
    }
  };

  const deleteBudget = async (id: number) => {
    await BudgetService.deleteBudgetBudgetIdDelete({ budgetId: id });
    context.setters.budgets(context.data.budgets.filter((b) => b.id !== id));
  }

  const renderType = (budget: BudgetType) => {
    let typeString = "Monthly";

    switch (budget.type) {
      case "yearly":
        typeString = "Yearly";
        break;
      case "bi-yearly":
        typeString = "Bi-Yearly";
        break;
      case "quarterly":
        typeString = "Quarterly";
        break;
    }

    return (
      <HStack fontSize={"xs"} color={"text-secondary"}>
        <Tag size={"sm"}>
          <IoCalendarSharp size={"10px"} />
          <Text ml={"5px"}>{typeString} </Text>
        </Tag>
        <Tag size={"sm"} colorScheme="gold">
          <Text>
            {DateTime.local(
              2022,
              computeStartMonth(budget).startMonth,
              1
            ).toLocaleString({
              month: "long",
            })}
          </Text>
          <Text mx={"5px"}>-</Text>
          <Text>
            {DateTime.local(
              2022,
              computeStartMonth(budget).endMonth,
              1
            ).toLocaleString({
              month: "long",
            })}
          </Text>
        </Tag>
      </HStack>
    );
  };

  return (
    <VStack
      h={"100%"}
      w={"100%"}
      padding={{ base: "15px 10px", md: "15px 30px" }}
      overflow={"hidden"}
      gap={"15px"}
    >
      <HStack
        w={"100%"}
        justifyContent={"space-between"}
        bg={"bg-secondary"}
        p={"5px 10px"}
        borderRadius={"5px"}
      >
        <HStack>
          <Text color={"gold-bg"}>
            <FaInfoCircle size={"25px"} />
          </Text>
          <Box>
            <Text fontSize={"xs"}>{t("budget.detail.restart")}</Text>
            <Text fontSize={"2xs"} color={"text-secondary"}>
              {t("budget.detail.timeline")}
            </Text>
          </Box>
        </HStack>
        <EditModal
          editable={editableParams}
          callback={callback}
          title={"Budget"}
          description={`Create a new budget for your finances.`}
        >
          <Button size={"sm"}>
            <Text fontSize={"sm"}>Add Budget</Text>
          </Button>
        </EditModal>
      </HStack>
      <Box w={"100%"} flexGrow={1} overflowY={"scroll"}>
        {!context.data.budgets || context.data.budgets.length === 0 ? (
          <Box
            w={"100%"}
            h={"100%"}
            textAlign={"center"}
            color={"text-secondary"}
            fontSize={"lg"}
          >
            <Text mt={"30px"} mb={"10px"}>
              {`Hey, you haven't created a budget yet!`}
            </Text>
            <Text>{`Go ahead, it's right above!`}</Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ md: 2, base: 1 }} spacing={"15px"} w={"100%"}>
            {context.data.budgets.map((b) => (
              <VStack
                key={b.id}
                bg={"bg-secondary"}
                padding={"20px"}
                gap={"10px"}
                w={"100%"}
                justifyContent={"space-between"}
                borderRadius={"3px"}
                borderLeft={"3px solid"}
                borderColor={
                  transactionByBudget[b.id]?.amount > b.amount
                    ? "success-bg"
                    : "bg-secondary"
                }
              >
                <HStack gap={"5px"} alignItems={"start"} w={"100%"}>
                  <Box>
                    <Text>{b.name}</Text>
                    <Text fontSize={"sm"} color={"text-secondary"}>
                      {b.description}
                    </Text>
                  </Box>
                  <Spacer />
                  <DeleteModal
                    title={"Budget"}
                    callback={() => deleteBudget(b.id)}
                    description={
                      'Are you sure you want to remove "{name}" from your account?'
                    }
                  >
                    <Button size={"sm"}>
                      <FaTrash />
                    </Button>
                  </DeleteModal>
                  <EditModal
                    editable={editableParams}
                    callback={callback}
                    record={b}
                    title={"Budget"}
                    description={"Create a new budget for your finances."}
                  >
                    <Button size={"sm"}>
                      <FaPencil />
                    </Button>
                  </EditModal>
                </HStack>
                <HStack justifyContent={"space-between"} w={"100%"}>
                  <Box>
                    <Text fontSize={"3xl"}>
                      {formatToCurrency(
                        transactionByBudget[b.id]?.amount || 0,
                        "EUR"
                      )}{" "}
                      / {formatToCurrency(b.amount, "EUR")}
                    </Text>
                    {renderType(b)}
                  </Box>
                  <CircularProgress
                    value={
                      (transactionByBudget[b.id]?.amount / b.amount) * 100 || 0
                    }
                    color={"gold.300"}
                    size={"70px"}
                  >
                    <CircularProgressLabel>
                      {Math.round(
                        (transactionByBudget[b.id]?.amount / b.amount) * 100
                      ) || 0}
                      %
                    </CircularProgressLabel>
                  </CircularProgress>
                </HStack>
              </VStack>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </VStack>
  );
}
