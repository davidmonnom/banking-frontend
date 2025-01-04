import { Styles } from "@chakra-ui/theme-tools"

export const styles: Styles = {
  global: {
    body: {
      fontFamily: "body",
      color: "text-primary",
      bg: "bg-primary",
      transitionProperty: "background-color",
      transitionDuration: "normal",
      lineHeight: "base",
    },
    "*::placeholder": {
      color: "chakra-placeholder-color",
    },
    "*, *::before, &::after": {
      borderColor: "chakra-border-color",
    },
  },
}
