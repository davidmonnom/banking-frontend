import { HStack, Text, Tooltip } from "@chakra-ui/react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

interface StatsIndicatorProps {
  history: number;
  current: number;
  income?: boolean;
}

export default function StatsIndicator({
  history,
  current,
  income = false,
}: StatsIndicatorProps) {
  let percent = Infinity;

  if (history < current) {
    percent = (history / current) * 100;
  } else if (history > current) {
    percent = (current / history) * 100;
  }

  return (
    <Tooltip
      colorScheme={"gold"}
      label={`Change in ${
        income ? "incomes" : "expenses"
      } compared with the previous period.`}
    >
      <HStack gap={"1px"}>
        {history <= current ? (
          <Text color={income ? "success-bg" : "danger-bg"}>
            <FaCaretUp />
          </Text>
        ) : (
          <Text color={income ? "danger-bg" : "success-bg"}>
            <FaCaretDown />
          </Text>
        )}
        <Text fontSize={"xs"}>{percent.toFixed(0)} %</Text>
      </HStack>
    </Tooltip>
  );
}
