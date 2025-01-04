"use client";

import { ColorModeScript } from "@chakra-ui/react";
import { ChakraProvider as OriginalChakraProvider } from "@chakra-ui/react";
import "@/app/globals.css";
import { theme } from "@/theme";

interface ChakraProviderProps {
  children: React.ReactNode;
}

export default function ChakraProvider({ children }: ChakraProviderProps) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <OriginalChakraProvider theme={theme}>{children}</OriginalChakraProvider>
    </>
  );
}
