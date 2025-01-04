import { Box, Flex, HStack, Switch, Text } from "@chakra-ui/react";
import { useMemo } from "react";

interface Record {
  id: number;
  name: string;
  color?: string;
}
interface MultiSelectorProps {
  value: number[];
  records: Record[];
  onChange: (categories: number[]) => void;
}

export default function MultiSelector({
  value,
  onChange,
  records,
}: MultiSelectorProps) {
  const onRecordClick = (record: Record) => {
    if (value.includes(record.id)) {
      onChange(value.filter((v) => v !== record.id));
    } else {
      onChange([...value, record.id]);
    }
  };
  const selectableValues = useMemo(() => {
    return records.sort((a, b) => {
      if (value.includes(a.id) && value.includes(b.id)) {
        return 0;
      } else if (value.includes(a.id)) {
        return -1;
      } else {
        return 1;
      }
    });
  }, [value, records]);

  return (
    <Flex
      w={"100%"}
      flexWrap={"wrap"}
      bg={"bg-primary"}
      padding={"10px"}
      gap={"10px"}
    >
      {selectableValues.map((record) => {
        return (
          <HStack
            width={"calc(50% - 10px)"}
            key={record.id}
            border={"1px solid"}
            borderRadius={"3px"}
            borderColor={"chakra-border-color"}
            padding={"3px"}
            cursor={"pointer"}
            onClick={() => onRecordClick(record)}
            transition={"all 0.2s ease-in-out"}
            opacity={value.includes(record.id) ? 1 : 0.5}
            justifyContent={"space-between"}
          >
            <HStack>
              <Box
                w={"10px"}
                h={"10px"}
                borderRadius={"999px"}
                bg={record.color || "gray"}
              />
              <Text fontSize={"sm"} noOfLines={1}>
                {record.name}
              </Text>
            </HStack>
            <Switch
              size="sm"
              isChecked={value.includes(record.id)}
              pointerEvents={"none"}
              colorScheme="gold"
            />
          </HStack>
        );
      })}
    </Flex>
  );
}
