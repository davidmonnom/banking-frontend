"use client";

import { Box, HStack, Select, Text } from "@chakra-ui/react";
import { AccountableContext } from "@/providers/ContextProvider";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import { useContext } from "react";

export default function UserSettingLanguage() {
  const context = useContext(AccountableContext);
  const activeLocal = useCurrentLocale();
  const changeLocale = useChangeLocale({ preserveSearchParams: true });
  const local = activeLocal;

  const onChange = async (lang: string) => {
    // context.setters.preferences((prev) => {
    //   return { ...prev, language: lang };
    // });

    // try {
    //   context.setters.loading(true);
    //   const result = await axios.post<feUserPreference>(
    //     `${process.env.NEXT_PUBLIC_API_URL}/user`,
    //     {
    //       ...context.data.preferences,
    //       language: lang,
    //     }
    //   );

    //   if (["en", "fr"].includes(lang)) {
    //     changeLocale(result.data.language as "en" | "fr");
    //   }
    // } catch (e) {
    //   context.setters.loading(false);
    //   console.log(e);
    // }
  };

  return (
    <Box w={"100%"} borderRadius={"3px"} padding={"10px"} bg={"bg-secondary"}>
      <HStack justifyContent={"space-between"}>
        <Box>
          <Text>Language</Text>
          <Text fontSize={"sm"} color={"text-secondary"}>
            Allow you to save your language preference
          </Text>
        </Box>
        <Box mt={"10px"}>
          <Select value={local} onChange={(e) => onChange(e.target.value)}>
            <option value={"en"}>English</option>
            <option value={"fr"}>French</option>
          </Select>
        </Box>
      </HStack>
    </Box>
  );
}
