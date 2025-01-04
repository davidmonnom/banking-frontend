"use client";

import {
  MouseEvent as ReactMouseEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AccountableContext } from "@/providers/ContextProvider";
import formatToCurrency from "@/utils/formatToCurrency";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import { IoCaretDown, IoCaretUp, IoLink } from "react-icons/io5";
import { Category, Transaction } from "@/client";

type FilteredData = {
  category: Category;
  transactions: Transaction[];
  evolution: number;
  amount: number;
  limit: number;
};

export default function Limit() {
  const context = useContext(AccountableContext);
  const router = useRouter();
  const [filtered, setFiltered] = useState<FilteredData[]>([]);

  useEffect(() => {
    const getFiltered = () => {
      return Object.entries(context.data.transByCategId)
        .filter(([catId]) => {
          const category = context.data.categories.find((c) => c.id === parseInt(catId));

          if (!category) {
            return false;
          }

          return category.limit !== 0;
        })
        .map(([catId, value]) => {
          const category = context.data.categories.find(
            (c) => c.id === parseInt(catId)
          ) as Category;
          const limit = context.states.computedDateRange.range * category.limit;
          return {
            category: category,
            transactions: value.transactions.sort(
              (a, b) => a.amount - b.amount
            ),
            evolution: Math.round((value.expense / limit) * 100) - 100,
            amount: value.expense,
            limit: limit,
          };
        })
        .sort((a, b) => b.evolution - a.evolution);
    };

    setFiltered(getFiltered());
  }, [context.data, context.states.computedDateRange.range]);

  const redirect = (
    e: ReactMouseEvent<HTMLSpanElement, MouseEvent>,
    category: number
  ) => {
    e.stopPropagation();

    context.setters.filter({
      type: "all",
      account: "",
      date: "",
      category: category,
    });

    router.push(`/transaction`);
  };

  return (
    <VStack
      h={"100%"}
      padding={{ base: "15px 10px", md: "15px 30px" }}
      overflow={"hidden"}
      gap={"30px"}
    >
      <Box
        h={"100%"}
        w={"100%"}
        bg={"bg-secondary"}
        p={"15px 20px"}
        borderRadius={"3px"}
        overflowY={"scroll"}
      >
        <Accordion defaultIndex={[0]} allowToggle>
          {filtered.map((data) => (
            <AccordionItem key={data.category.id}>
              <AccordionButton padding={"10px 0px 10px 0px"}>
                <HStack
                  w={"100%"}
                  justifyContent={"space-between"}
                  padding={"0px 0px 0px 15px"}
                  alignItems={"center"}
                  borderLeft={`3px solid ${data.category.color}`}
                >
                  <Box textAlign={"left"}>
                    <Text fontSize={"lg"} noOfLines={1}>
                      {data.category.name}
                    </Text>
                    <Text fontSize={"xs"} color={"text-secondary"}>
                      {formatToCurrency(data.limit, "EUR")}
                    </Text>
                  </Box>
                  <Box>
                    <Tag
                      size={"md"}
                      bg={data.evolution > 0 ? "danger-bg" : "success-bg"}
                      mr={"10px"}
                      color={data.evolution > 0 ? "danger-text" : "succes-text"}
                    >
                      {data.evolution > 0 ? <IoCaretUp /> : <IoCaretDown />}
                      <Text ml={"5px"}>{Math.abs(data.evolution)}%</Text>
                    </Tag>
                    <Tag
                      size={"md"}
                      cursor={"pointer"}
                      onClick={(e) => redirect(e, data.category.id)}
                    >
                      <IoLink />
                    </Tag>
                    <AccordionIcon />
                  </Box>
                </HStack>
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Box w={"100%"}>
                  {data.transactions.map((t) => (
                    <HStack
                      key={t.id}
                      justifyContent={"space-between"}
                      alignItems={"start"}
                    >
                      <Box>
                        <Text fontSize={"sm"}>{t.name}</Text>
                        <Text fontSize={"xs"} color={"text-secondary"}>
                          {DateTime.fromSQL(t.date, { zone: "UTC" }).toFormat(
                            "dd/MM/yyyy"
                          )}
                        </Text>
                      </Box>
                      <Text fontSize={"md"}>
                        {formatToCurrency(t.amount, "EUR")}
                      </Text>
                    </HStack>
                  ))}
                </Box>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
        {filtered.length === 0 && (
          <Text
            fontSize={"sm"}
            color={"text-secondary"}
            align={"center"}
            mt={"20px"}
          >
            To use limits, you must first define them for your categories.
          </Text>
        )}
      </Box>
    </VStack>
  );
}
