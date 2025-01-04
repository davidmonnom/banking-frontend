"use client";

import EditModal from "@/components/modal/EditModal";
import { AccountableContext } from "@/providers/ContextProvider";
import { Box, Button, HStack, Tag, Text, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import DataTable, { DataTableColumn } from "@/components/DataTable";
import formatToCurrency from "@/utils/formatToCurrency";
import { FaPencil } from "react-icons/fa6";
import { CategoryService, Category as CategoryType } from "@/client";

export default function Category() {
  const context = useContext(AccountableContext);

  const callback = async (category: CategoryType) => {
    if (category.id) {
      const categ = await CategoryService.updateCategoryCategoryIdPut({
        categoryId: category.id,
        requestBody: category,
      });

      context.setters.categories(
        context.data.categories.map((c) => {
          if (c.id === categ.id) {
            return categ;
          }
          return c;
        })
      );
    } else {
      category.groupId = context.data.groups[0].id;
      const categ = await CategoryService.createCategoryPost({
        requestBody: category,
      });
      context.setters.categories((prev) => [...prev, categ]);
    }
  };

  const generateEditableModal = (categoryId: number) => {
    const category = context.data.categories.find(
      (c) => c.id === categoryId
    ) as CategoryType;

    if (!category) {
      return null;
    }

    return (
      <Box mt={"5px"}>
        <EditModal
          editable={[
            {
              name: "Name",
              type: "input",
              key: "name",
              value: category.name,
              required: true,
            },
            {
              name: "Limit",
              type: "number",
              key: "limit",
              value: category.limit,
              required: true,
            },
            {
              name: "Color",
              type: "color",
              key: "color",
              value: category.color || "",
              required: true,
            },
          ]}
          callback={callback}
          record={category}
          title={"Category"}
          description={`Edit your category informations`}
        >
          <Button size={"xs"}>
            <FaPencil />
            <Text ml={"5px"}>Edit</Text>
          </Button>
        </EditModal>
      </Box>
    );
  };

  return (
    <VStack
      h={"100%"}
      padding={{ base: "15px 10px", md: "15px 30px" }}
      overflow={"hidden"}
    >
      <HStack w={"100%"} justifyContent={"flex-end"}>
        <EditModal
          editable={[
            {
              name: "Name",
              type: "input",
              key: "name",
              value: "",
              required: true,
            },
            {
              name: "Limit",
              type: "number",
              key: "limit",
              value: 0,
              required: true,
            },
            {
              name: "Color",
              type: "color",
              key: "color",
              value: "",
              required: true,
            },
          ]}
          callback={callback}
          title={"Category"}
          description={`Edit your category informations`}
        >
          <Button size={"sm"}>
            <Text fontSize={"sm"}>Add Category</Text>
          </Button>
        </EditModal>
      </HStack>
      <Box w={"100%"} flexGrow={1} overflowY={"hidden"}>
        <DataTable
          loading={context.states.refresh}
          columns={[
            { key: "name", name: "Name", space: "30%" },
            {
              key: "limit",
              name: "Limit",
              space: "15%",
              custom: (c: DataTableColumn, data: any) => {
                const expenseLimitReached = data["expense"] > data["limit"];
                const bgColor = expenseLimitReached
                  ? "danger-bg"
                  : "success-bg";
                const textColor = expenseLimitReached
                  ? "danger-text"
                  : "success-text";

                if (data["limit"] === 0) {
                  return (
                    <Box w={c.space} key={`${c.key} ${c.space}`}>
                      <Text fontSize={"sm"} color="text-secondary">
                        No limit
                      </Text>
                    </Box>
                  );
                }
                return (
                  <Box w={c.space} key={`${c.key} ${c.space}`}>
                    <Tag size={"sm"} bgColor={bgColor} color={textColor}>
                      {formatToCurrency(
                        data["expense"] - data["income"],
                        "EUR"
                      )}
                      {" / "}
                      {formatToCurrency(data[c.key], "EUR")}
                    </Tag>
                  </Box>
                );
              },
            },
            { key: "expenseFormatted", name: "Expense", space: "15%" },
            { key: "incomeFormatted", name: "Income", space: "15%" },
            { key: "transactions", name: "Transactions", space: "15%" },
          ]}
          data={context.data.categories.map((c) => {
            return {
              ...c,
              expense: context.data.transByCategId[c.id]?.expense || 0,
              income: context.data.transByCategId[c.id]?.income || 0,
              expenseFormatted: formatToCurrency(
                context.data.transByCategId[c.id]?.expense || 0,
                "EUR"
              ),
              incomeFormatted: formatToCurrency(
                context.data.transByCategId[c.id]?.income || 0,
                "EUR"
              ),
              transactions:
                context.data.transByCategId[c.id]?.nbrTransactions || "0",
            };
          })}
          editModal={generateEditableModal}
        />
      </Box>
    </VStack>
  );
}
