import {
  cssVar,
  defineStyle,
  defineStyleConfig,
} from "@chakra-ui/styled-system"

const $startColor = cssVar("skeleton-start-color")
const $endColor = cssVar("skeleton-end-color")

const baseStyle = defineStyle({
  [$startColor.variable]: "colors.blackAlpha.100",
  [$endColor.variable]: "colors.blackAlpha.400",
  _dark: {
    [$startColor.variable]: "colors.blackAlpha.800",
    [$endColor.variable]: "colors.blackAlpha.600",
  },
  background: $startColor.reference,
  borderColor: $endColor.reference,
  opacity: 0.6,
  borderRadius: "sm",
})

export const skeletonTheme = defineStyleConfig({
  baseStyle,
})
