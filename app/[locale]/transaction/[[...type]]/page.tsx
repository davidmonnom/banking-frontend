"use client";

import DataTable, { DataTableColumn } from "@/components/DataTable";
import EditModal from "@/components/modal/EditModal";
import { AccountableContext } from "@/providers/ContextProvider";
import filterTransactions from "@/utils/filterTransactions";
import { DateTime } from "luxon";
import { useContext, useEffect, useMemo } from "react";
import { FaPencil } from "react-icons/fa6";
import { useI18n } from "@/locales/client";
import {
  Box,
  Button,
  HStack,
  Input,
  Select,
  Spacer,
  Tag,
  VStack,
} from "@chakra-ui/react";
import formatToCurrency from "@/utils/formatToCurrency";
import { TransactionService, Transaction as TransactionType } from "@/client";

interface TransactionProps {
  params: {
    type?: string[];
  };
}

export default function Transaction({ params }: TransactionProps) {
  const t = useI18n();
  const context = useContext(AccountableContext);
  const filteredTransaction = useMemo(
    () =>
      Object.values(
        filterTransactions(
          context.data.transactions,
          context.states.filter.type,
          context.states.filter.date,
          context.states.filter.category
        )
      ).flat(),
    [context.states.filter, context.data.transactions]
  );

  useEffect(() => {
    let type = "all";
    let category = context.states.filter.category;

    if (params.type) {
      switch (params.type[0]) {
        case "incomes":
          type = "income";
          break;
        case "expenses":
          type = "expense";
          break;
        default:
          type = "all";
          break;
      }

      if (params.type[0] === "uncategorized") {
        category = -1;
      }
    }

    context.setters.filter({
      ...context.states.filter,
      type,
      category,
    });
  }, [params.type]);

  const callback = async (data: any) => {
    const transaction =
      await TransactionService.updateTransactionTransactionIdPut({
        transactionId: data.id,
        requestBody: {
          ...data,
          categories: data.categories,
          budgets: data.budgets,
          goals: data.goals,
        },
      });

    context.setters.transactions((prev) => {
      const transactions = [...prev];
      const index = transactions.findIndex((t) => t.id === data.id);
      transactions[index] = transaction;
      return transactions;
    });
  };

  const generateEditableModal = (transactionId: number) => {
    const transaction = context.data.transactions.find(
      (t) => t.id === transactionId
    ) as TransactionType;

    if (!transaction) {
      return null;
    }

    return (
      <Box mt={"5px"}>
        <EditModal
          editable={[
            {
              name: t("common.word.name"),
              type: "input",
              key: "name",
              value: transaction.name,
              required: true,
            },
            {
              name: t("budget.word.plural"),
              type: "multi-select",
              key: "budgets",
              value: transaction.budgets.map((b) => b.id),
              selectValues: context.data.budgets.map((b) => ({
                id: b.id,
                name: b.name,
              })),
              required: false,
            },
            {
              name: t("goal.word.plural"),
              type: "multi-select",
              key: "goals",
              value: transaction.goals.map((g) => g.id),
              selectValues: context.data.goals.map((g) => ({
                id: g.id,
                name: g.name,
              })),
              required: false,
            },
            {
              name: t("category.word.plural"),
              type: "multi-select",
              key: "categories",
              value: transaction.categories.map((c) => c.id),
              selectValues: context.data.categories.map((c) => ({
                id: c.id,
                name: c.name,
                color: c.color,
              })),
              required: false,
            },
          ]}
          callback={callback}
          record={transaction}
          title={t("transaction.edit.title")}
          description={t("transaction.edit.subtitle")}
        >
          <Button size={"xs"} gap={"5px"}>
            <FaPencil />
            {t("common.word.edit")}
          </Button>
        </EditModal>
      </Box>
    );
  };

  return (
    <VStack
      padding={{ base: "15px 10px", md: "20px 30px" }}
      overflowY={"scroll"}
      h={"100%"}
    >
      <HStack
        justifyContent={"end"}
        w={"100%"}
        p={"7px"}
        borderRadius={"5px"}
        bg={"bg-secondary"}
        gap={"10px"}
      >
        <Box flexGrow={1}>
          <Input
            placeholder={t("common.word.search")}
            size="xs"
            colorScheme="gold"
            w={"100%"}
            outline={"none"}
          />
        </Box>
        <Spacer />
        <Box w={"300px"}>
          <Select
            value={context.states.filter.category || 0}
            colorScheme="gold"
            onChange={(e) =>
              context.setters.filter({
                ...context.states.filter,
                category: parseInt(e.target.value),
              })
            }
            size={"xs"}
          >
            <option value="0">{t("common.word.all")}</option>
            <option value="-1">{t("uncategorized.word.singular")}</option>
            {context.data.categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </Box>
        <Box>
          <Input
            colorScheme={"gold"}
            type="date"
            value={context.states.filter.date}
            max={context.states.computedDateRange.curEnd.toFormat("yyyy-MM-dd")}
            min={context.states.computedDateRange.curStart.toFormat(
              "yyyy-MM-dd"
            )}
            size={"xs"}
            onChange={(e) =>
              context.setters.filter({
                ...context.states.filter,
                date: e.target.value,
              })
            }
          />
        </Box>
      </HStack>
      <Box flexGrow={1} overflowY={"hidden"} w={"100%"}>
        <DataTable
          loading={context.states.refresh}
          columns={[
            {
              key: "name",
              name: t("common.word.name"),
              space: "30%",
            },
            {
              key: "date",
              name: t("common.word.date"),
              space: "6%",
            },
            {
              key: "amount",
              name: t("common.word.amount"),
              space: "10%",
              custom: (c: DataTableColumn, data: any) => {
                return (
                  <Box w={c.space} key={`${c.key} ${c.space}`}>
                    <Tag
                      size={"sm"}
                      bgColor={data[c.key] <= 0 ? "danger-bg" : "success-bg"}
                      color={data[c.key] <= 0 ? "danger-text" : "success-text"}
                    >
                      {formatToCurrency(data[c.key], "EUR")}
                    </Tag>
                  </Box>
                );
              },
            },
            {
              key: "categories",
              name: t("category.word.plural"),
              space: "15%",
            },
            {
              key: "budgets",
              name: t("budget.word.plural"),
              space: "15%",
            },
            {
              key: "goals",
              name: t("goal.word.plural"),
              space: "15%",
            },
          ]}
          data={filteredTransaction.map((tr) => {
            return {
              ...tr,
              date: DateTime.fromSQL(tr.date, { zone: "UTC" }).toFormat(
                "dd/MM/yyyy"
              ),
              categories: tr.categories
                .map((c) => context.data.categoryById[c.id]?.name)
                .join(", ") || (
                <Tag size={"sm"} colorScheme="gold">
                  {t("uncategorized.word.plural")}
                </Tag>
              ),
              budgets: tr.budgets
                .map((b) => context.data.budgetById[b.id]?.name)
                .join(", ") || (
                <Tag size={"sm"} colorScheme="gold">
                  {t("budget.detail.noRecord")}
                </Tag>
              ),
              goals: tr.goals
                .map((g) => context.data.goalById[g.id]?.name)
                .join(", ") || (
                <Tag size={"sm"} colorScheme="gold">
                  {t("goal.detail.noRecord")}
                </Tag>
              ),
            };
          })}
          editModal={generateEditableModal}
        />
      </Box>
    </VStack>
  );
}
