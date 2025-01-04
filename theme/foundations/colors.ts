const colors = {
  transparent: "transparent",
  current: "currentColor",
  black: "#000000",
  white: "#FFFFFF",

  bgPrimaryL: "#FFFFFF",
  bgSecondaryL: "#F6F5FB",
  bgPrimaryD: "#000000",
  bgSecondaryD: "#090909",
  bgTertiaryD: "#3A3A3A",
  bgTertiaryL: "#F3F4F6",

  textPrimaryL: "#0D0E1F",
  textSecondaryL: "#4A5568",
  textPrimaryD: "#DCDCDC",
  textSecondaryD: "#8C8C8C",

  successBg: "#a8ffa8",
  successText: "#045600",

  dangerBg: "#ff957e",
  dangerText: "#480900",

  validationTextL: "#950000",
  validationTextD: "#FF6C6C",

  gold: {
    50: "#FFF5E5",
    100: "#FFE3B8",
    200: "#FFD18A",
    300: "#FFBF5C",
    400: "#FFAD2E",
    500: "#FF9B00",
    600: "#CC7C00",
    700: "#995D00",
    800: "#663E00",
    900: "#331F00",
  },
  blue: {
    50: "#EDEEF7",
    100: "#CDCEEA",
    200: "#ACAFDC",
    300: "#8C90CF",
    400: "#6C70C1",
    500: "#4B51B4",
    600: "#3C4190",
    700: "#2D316C",
    800: "#1E2048",
    900: "#0F1024",
  },
  gray: {
    50: "#F7FAFC",
    100: "#EDF2F7",
    200: "#E2E8F0",
    300: "#CBD5E0",
    400: "#A0AEC0",
    500: "#718096",
    600: "#4A5568",
    700: "#2D3748",
    800: "#1A202C",
    900: "#171923",
  },
  success: {
    50: "#F0F7ED",
    100: "#D4E9CE",
    200: "#B8DAAE",
    300: "#9CCC8F",
    400: "#80BE6F",
    500: "#65AF50",
    600: "#508C40",
    700: "#3C6930",
    800: "#284620",
    900: "#142310",
  },
  danger: {
    50: "#F7EEEE",
    100: "#E7CFCF",
    200: "#D8B0B0",
    300: "#C99292",
    400: "#BA7373",
    500: "#AB5454",
    600: "#894343",
    700: "#673232",
    800: "#442222",
    900: "#221111",
  },
  whiteAlpha: {
    50: "rgba(255, 255, 255, 0.04)",
    100: "rgba(255, 255, 255, 0.06)",
    200: "rgba(255, 255, 255, 0.08)",
    300: "rgba(255, 255, 255, 0.16)",
    400: "rgba(255, 255, 255, 0.24)",
    500: "rgba(255, 255, 255, 0.36)",
    600: "rgba(255, 255, 255, 0.48)",
    700: "rgba(255, 255, 255, 0.64)",
    800: "rgba(255, 255, 255, 0.80)",
    900: "rgba(255, 255, 255, 0.92)",
  },

  blackAlpha: {
    50: "rgba(0, 0, 0, 0.04)",
    100: "rgba(0, 0, 0, 0.06)",
    200: "rgba(0, 0, 0, 0.08)",
    300: "rgba(0, 0, 0, 0.16)",
    400: "rgba(0, 0, 0, 0.24)",
    500: "rgba(0, 0, 0, 0.36)",
    600: "rgba(0, 0, 0, 0.48)",
    700: "rgba(0, 0, 0, 0.64)",
    800: "rgba(0, 0, 0, 0.80)",
    900: "rgba(0, 0, 0, 0.92)",
  },
  red: {
    50: "#FFF5F5",
    100: "#FED7D7",
    200: "#FEB2B2",
    300: "#FC8181",
    400: "#F56565",
    500: "#E53E3E",
    600: "#C53030",
    700: "#9B2C2C",
    800: "#822727",
    900: "#63171B",
  },

  orange: {
    50: "#FFFAF0",
    100: "#FEEBC8",
    200: "#FBD38D",
    300: "#F6AD55",
    400: "#ED8936",
    500: "#DD6B20",
    600: "#C05621",
    700: "#9C4221",
    800: "#7B341E",
    900: "#652B19",
  },

  yellow: {
    50: "#FFFFF0",
    100: "#FEFCBF",
    200: "#FAF089",
    300: "#F6E05E",
    400: "#ECC94B",
    500: "#D69E2E",
    600: "#B7791F",
    700: "#975A16",
    800: "#744210",
    900: "#5F370E",
  },

  green: {
    50: "#F0FFF4",
    100: "#C6F6D5",
    200: "#9AE6B4",
    300: "#68D391",
    400: "#48BB78",
    500: "#38A169",
    600: "#2F855A",
    700: "#276749",
    800: "#22543D",
    900: "#1C4532",
  },

  teal: {
    50: "#E6FFFA",
    100: "#B2F5EA",
    200: "#81E6D9",
    300: "#4FD1C5",
    400: "#38B2AC",
    500: "#319795",
    600: "#2C7A7B",
    700: "#285E61",
    800: "#234E52",
    900: "#1D4044",
  },

  cyan: {
    50: "#EDFDFD",
    100: "#C4F1F9",
    200: "#9DECF9",
    300: "#76E4F7",
    400: "#0BC5EA",
    500: "#00B5D8",
    600: "#00A3C4",
    700: "#0987A0",
    800: "#086F83",
    900: "#065666",
  },

  purple: {
    50: "#FAF5FF",
    100: "#E9D8FD",
    200: "#D6BCFA",
    300: "#B794F4",
    400: "#9F7AEA",
    500: "#805AD5",
    600: "#6B46C1",
    700: "#553C9A",
    800: "#44337A",
    900: "#322659",
  },

  pink: {
    50: "#FFF5F7",
    100: "#FED7E2",
    200: "#FBB6CE",
    300: "#F687B3",
    400: "#ED64A6",
    500: "#D53F8C",
    600: "#B83280",
    700: "#97266D",
    800: "#702459",
    900: "#521B41",
  },
};

export default colors;
