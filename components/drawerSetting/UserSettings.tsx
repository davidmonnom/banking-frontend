import { Box, Text, VStack } from "@chakra-ui/react";
import UserSettingShare from "./UserSettingShare";
import UserSettingLanguage from "./UserSettingsLanguage";
import { Suspense } from "react";

export default function UserSettings() {
  return (
    <Box w={"100%"}>
      <Text fontSize={"xl"} fontWeight={300} textTransform={"uppercase"}>
        Settings
      </Text>
      <Text fontSize={"sm"} mb={"15px"} color={"text-secondary"}>
        {`Various parameters that influence the application's behavior.`}
      </Text>
      <VStack w={"100%"}>
        <UserSettingShare />
        <Suspense fallback={<></>}>
          <UserSettingLanguage />
        </Suspense>
      </VStack>
    </Box>
  );
}
