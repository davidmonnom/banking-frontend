import formatToCurrency from "@/utils/formatToCurrency";
import {
  Box,
  Divider,
  HStack,
  Text,
  VStack,
  Tag,
  Spacer,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export type DataTableColumn = {
  key: string;
  space: string;
  name: string;
  custom?: Function;
};

interface DataTableProps {
  data: any[];
  editModal?: Function;
  records?: any[];
  loading: boolean;
  columns: DataTableColumn[];
}

export default function DataTable({
  data,
  columns,
  editModal,
  loading = false,
}: DataTableProps) {
  const [render, setRender] = useState(true);

  useEffect(() => {
    setRender(false);
  }, []);

  // const getPageElements = (index) => {
  //   const start = index * 50;
  //   const end = start + 50;
  //   return data.slice(start, end);
  // }

  return (
    <VStack h={"100%"} w={"100%"} bg={"bg-secondary"} borderRadius={"5px"}>
      <HStack padding={"10px 20px 0px 20px"} w={"100%"} gap={"10px"}>
        {columns.map((c) => (
          <Box key={c.key} w={c.space}>
            <Text fontSize={"sm"}>{c.name}</Text>
          </Box>
        ))}
      </HStack>
      <Divider />
      <VStack flexGrow={"1"} overflowY={"scroll"} gap={"10px"} w={"100%"}>
        {loading || render ? (
          <>
            {[...Array(50)].map((_, i) => (
              <HStack
                key={i}
                p={"10px 20px"}
                alignItems={"center"}
                borderRadius={"3px"}
                w={"100%"}
                gap={"10px"}
              >
                {columns.map((c) => (
                  <Box key={c.key} w={c.space}>
                    <Skeleton height={"20px"} />
                  </Box>
                ))}
                <Box flexGrow={1}>
                  <Skeleton height={"20px"} />
                </Box>
                <Spacer />
              </HStack>
            ))}
          </>
        ) : (
          <>
            {data.map((d) => {
              return (
                <Box key={d.id} w={"100%"}>
                  <HStack
                    p={"0px 20px"}
                    alignItems={"center"}
                    borderRadius={"3px"}
                    w={"100%"}
                    gap={"10px"}
                  >
                    {columns.map((c) => {
                      if (c.custom) {
                        return c.custom(c, d);
                      }

                      return (
                        <Box w={c.space} key={`${c.key} ${c.space}`}>
                          <Text fontSize={"sm"} noOfLines={1}>
                            {d[c.key]}
                          </Text>
                        </Box>
                      );
                    })}
                    <Spacer />
                    {editModal && editModal(d.id)}
                  </HStack>
                  <Divider variant={"dashed"} mt={"7px"} />
                </Box>
              );
            })}
          </>
        )}
      </VStack>
    </VStack>
  );
}
