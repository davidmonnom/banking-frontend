"use client";

import { Box, Button, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { useContext } from "react";
import { AccountableContext } from "@/providers/ContextProvider";
import EditModal from "@/components/modal/EditModal";
import { FaTrash } from "react-icons/fa6";
import DeleteModal from "@/components/modal/DeleteModal";
import { UserService } from "@/client";

export default function UserSettingShare() {
  const context = useContext(AccountableContext);
  const bgColor = useColorModeValue("blackAlpha.100", "blackAlpha.300");

  const deleteUser = async (id: number) => {
    await UserService.removeSharedUserUserSharedUserIdDelete({ userId: id });

    context.setters.sharedUsers(
      context.data.sharedUsers.filter((user) => user.id !== id)
    );
  };

  const addUser = async (data: any) => {
    const user = await UserService.addSharedUserUserSharedPost({
      email: data.email,
    });

    context.setters.sharedUsers([...context.data.sharedUsers, user]);
  };

  return (
    <Box w={"100%"} borderRadius={"3px"} padding={"10px"} bg={"bg-secondary"}>
      <HStack justifyContent={"space-between"}>
        <Box>
          <Text>Allowed users</Text>
          <Text fontSize={"sm"} color={"text-secondary"}>
            Users with access to your account data.
          </Text>
        </Box>
        <EditModal
          editable={[
            {
              name: "Email",
              type: "email",
              key: "email",
              value: "",
              required: true,
            },
          ]}
          title={"User"}
          callback={(data) => addUser(data)}
          description={`Please enter the email address of the user you wish to add to your
            account. Please note that the user must already be logged in to
            our application.`}
        >
          <Button size={"sm"}>Add User</Button>
        </EditModal>
      </HStack>
      {context.data.sharedGroups?.length > 0 && (
        <Box mt={"10px"}>
          {context.data.sharedUsers?.map((share) => (
            <HStack
              key={share.email}
              justifyContent={"space-between"}
              bg={bgColor}
              padding={"5px 10px"}
              borderRadius={"3px"}
            >
              <Box>
                <Text fontSize={"sm"}>
                  {share.first_name} {share.last_name}
                </Text>
                <Text fontSize={"xs"} color={"text-secondary"}>
                  {share.email}
                </Text>
              </Box>
              <DeleteModal
                title={"User"}
                description={`Are you sure you want to remove ${share.first_name} ${share.last_name} from your account?`}
                callback={() => deleteUser(share.id)}
              >
                <Button size={"sm"}>
                  <FaTrash />
                </Button>
              </DeleteModal>
            </HStack>
          ))}
        </Box>
      )}
    </Box>
  );
}
