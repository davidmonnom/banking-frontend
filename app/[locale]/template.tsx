import { Box } from "@chakra-ui/react";

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  return <Box h={"100%"} w={"100%"}>{children}</Box>;
}
