"use client";

import EditModal from "@/components/modal/EditModal";
import { AccountableContext } from "@/providers/ContextProvider";
import formatToCurrency from "@/utils/formatToCurrency";
import { useContext, useMemo } from "react";
import { FaPencil } from "react-icons/fa6";
import DeleteModal from "@/components/modal/DeleteModal";
import { FaInfoCircle, FaTrash } from "react-icons/fa";
import { useI18n } from "@/locales/client";
import { GoalEditableParams } from "@/data/data";
import { DateTime } from "luxon";
import { IoCalendarSharp } from "react-icons/io5";
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
import { GoalService, Goal as GoalType, Transaction } from "@/client";

type GoalTypeAcc = {
  amount: number;
  transactions: Transaction[];
};

export default function Goal() {
  const t = useI18n();
  const editableParams = GoalEditableParams();
  const context = useContext(AccountableContext);
  const transactionByGoal = useMemo(() => {
    return [...context.data.transactionsOut, ...context.data.transactions]
      .filter((t) => t.goals.length > 0)
      .reduce((acc, t: Transaction) => {
        for (const g of t.goals) {
          if (!acc[g.id]) {
            acc[g.id] = {
              amount: 0,
              transactions: [],
            };
          }

          // Inverse the amount if the transaction is an expense
          acc[g.id].amount += -t.amount;
          acc[g.id].transactions.push(t);
        }

        return acc;
      }, {} as { [key: string]: GoalTypeAcc });
  }, [context.data.goals, context.data.transactions]);

  const callback = async (data: GoalType) => {
    if (data.id) {
      const budgets = await GoalService.updateGoalGoalIdPut({
        goalId: data.id,
        requestBody: data,
      });
      context.setters.goals((prev) =>
        prev.map((b) => (b.id === data.id ? budgets : b))
      );
    } else {
      data.groupId = context.data.groups[0].id;
      const budgets = await GoalService.createGoalPost({
        requestBody: data,
      });
      context.setters.goals((prev) => [...prev, budgets]);
    }
  };

  const deleteGoal = async (id: number) => {
    await GoalService.deleteGoalGoalIdDelete({ goalId: id });
    context.setters.goals((prev) => prev.filter((b) => b.id !== id));
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
            <Text fontSize={"xs"}>{t("goal.detail.restart")}</Text>
            <Text fontSize={"2xs"} color={"text-secondary"}>
              {t("goal.detail.timeline")}
            </Text>
          </Box>
        </HStack>
        <EditModal
          editable={editableParams}
          callback={callback}
          title={"Goal"}
          description={`Create a new goal for your finances.`}
        >
          <Button size={"sm"}>
            <Text fontSize={"sm"}>Add Goal</Text>
          </Button>
        </EditModal>
      </HStack>
      <Box w={"100%"} flexGrow={1} overflowY={"scroll"}>
        {!context.data.goals || context.data.goals.length === 0 ? (
          <Box
            w={"100%"}
            h={"100%"}
            textAlign={"center"}
            color={"text-secondary"}
            fontSize={"lg"}
          >
            <Text mt={"30px"} mb={"10px"}>
              {`Hey, you haven't created a goal yet!`}
            </Text>
            <Text>{`Go ahead, it's right above!`}</Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ md: 2, base: 1 }} spacing={"15px"} w={"100%"}>
            {context.data.goals.map((g) => (
              <VStack
                key={g.id}
                bg={"bg-secondary"}
                padding={"20px"}
                gap={"10px"}
                w={"100%"}
                justifyContent={"space-between"}
                borderRadius={"3px"}
                borderLeft={"3px solid"}
                borderColor={
                  transactionByGoal[g.id]?.amount > g.amount
                    ? "success-bg"
                    : "bg-secondary"
                }
              >
                <HStack gap={"5px"} alignItems={"start"} w={"100%"}>
                  <Box>
                    <Text>{g.name}</Text>
                    <Text fontSize={"sm"} color={"text-secondary"}>
                      {g.description}
                    </Text>
                  </Box>
                  <Spacer />
                  <DeleteModal
                    title={"Goal"}
                    description={
                      'Are you sure you want to remove "{name}" from your account?'
                    }
                    callback={() => deleteGoal(g.id)}
                  >
                    <Button size={"sm"}>
                      <FaTrash />
                    </Button>
                  </DeleteModal>
                  <EditModal
                    editable={editableParams}
                    callback={callback}
                    record={g}
                    title={"Goals"}
                    description={"Create a new goal for your finances."}
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
                        transactionByGoal[g.id]?.amount || 0,
                        "EUR"
                      )}{" "}
                      / {formatToCurrency(g.amount, "EUR")}
                    </Text>
                    <Tag size={"sm"}>
                      <IoCalendarSharp size={"10px"} />
                      <Text ml={"5px"}>
                        {" "}
                        {DateTime.fromSQL(g.dateEnd, { zone: "utc" }).toFormat(
                          "dd/MM/yyyy"
                        )}
                      </Text>
                    </Tag>
                  </Box>
                  <CircularProgress
                    value={
                      (transactionByGoal[g.id]?.amount / g.amount) * 100 || 0
                    }
                    color={"gold.300"}
                    size={"70px"}
                  >
                    <CircularProgressLabel>
                      {Math.round(
                        (transactionByGoal[g.id]?.amount / g.amount) * 100
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
