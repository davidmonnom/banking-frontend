"use client";

import {
  HStack,
  Box,
  Tag,
  Text,
  Button,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AccountableContext } from "@/providers/ContextProvider";
import { DateTime } from "luxon";
import { FaPencil, FaTrash } from "react-icons/fa6";
import EditModal from "@/components/modal/EditModal";
import DeleteModal from "@/components/modal/DeleteModal";
import { GoalService, Item, ItemService } from "@/client";

interface ItemDetailsCardProps {
  item: Item;
}

export default function ItemDetailsCard({ item }: ItemDetailsCardProps) {
  const context = useContext(AccountableContext);
  const bgColor = useColorModeValue("blackAlpha.100", "blackAlpha.300");

  const getAccounts = () => {
    return context.data.accounts.filter((account) => {
      return account.id === item.id;
    });
  };

  const getOwner = (item: Item) => {
    const group = [...context.data.groups, ...context.data.sharedGroups].find(
      (group) => group.id === item.groupId
    );

    return group?.name;
  };

  const deleteCallback = (id: number) => {
    console.warn("not yet implemented", id);
  };

  const callback = async (item: Item) => {
    console.warn("not yet implemented", item);
    // const categ = await CategoryService.updateCategoryCategoryIdPut({
    //   categoryId: category.id,
    //   requestBody: category,
    // });

    // context.setters.categories(
    //   context.data.categories.map((c) => {
    //     if (c.id === categ.id) {
    //       return categ;
    //     }
    //     return c;
    //   })
    // );
  };

  return (
    <Box
      key={item.id}
      w={"100%"}
      borderRadius={"3px"}
      padding={"10px"}
      bg={"bg-secondary"}
    >
      <HStack justifyContent={"space-between"}>
        <Box>
          <HStack>
            <Text fontWeight={400} display={"block"}>
              {item.institutionName}
            </Text>
            <Tag size={"sm"} colorScheme={"gold"}>
              {getOwner(item)}
            </Tag>
          </HStack>
          <HStack alignItems={"center"}>
            <Text fontSize={"xs"}>Last synchronization:</Text>
            <Text fontSize={"xs"} color={"text-secondary"}>
              {item.updateDate
                ? DateTime.fromSQL(item.updateDate, { zone: "UTC" }).toFormat(
                    "dd/MM/yyyy HH:mm"
                  )
                : "Never"}
            </Text>
          </HStack>
          <HStack alignItems={"center"}>
            <Text fontSize={"xs"}>Provider:</Text>
            <Text fontSize={"xs"} color={"text-secondary"}>
              Plaid
            </Text>
          </HStack>
        </Box>
        <VStack>
          <DeleteModal
            title={"Delete Item"}
            description={`Are you sure you want to delete this item? All accounts and transactions associated with this item will be deleted as well.`}
            callback={() => deleteCallback(item.id)}
          >
            <Button size={"sm"}>
              <FaTrash />
            </Button>
          </DeleteModal>
        </VStack>
      </HStack>

      <Box
        w={"100%"}
        mt={"20px"}
        display={getAccounts().length ? "block" : "none"}
      >
        <Text mb={"5px"}>Accounts:</Text>
        {getAccounts().map((account) => (
          <HStack
            bg={bgColor}
            padding={"5px 10px"}
            borderRadius={"3px"}
            key={account.id}
            w={"100%"}
            justifyContent={"space-between"}
          >
            <Box>
              <Text fontSize={"xs"} fontWeight={400}>
                {account.name}
              </Text>
              <Text fontSize={"xs"} color={"text-secondary"}>
                {account.mask}
              </Text>
            </Box>
            <EditModal
              editable={[
                {
                  type: "input",
                  name: "Name",
                  key: "name",
                  value: account.name,
                  required: true,
                },
              ]}
              record={account}
              title={"Account"}
              description={"Edit your account informations"}
              callback={callback}
            >
              <Button size={"sm"}>
                <FaPencil />
              </Button>
            </EditModal>
          </HStack>
        ))}
      </Box>
    </Box>
  );
}
