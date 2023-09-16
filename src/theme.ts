import {
  extendTheme,
  type StyleFunctionProps,
  type ThemeConfig,
  createMultiStyleConfigHelpers,
} from "@chakra-ui/react";
import { tabsAnatomy } from "@chakra-ui/anatomy";
import { mode } from "@chakra-ui/theme-tools";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

// Chakra theme configuration
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
  cssVarPrefix: "btc-faces",
};

const fonts = {
  heading: "Really Sans Large, Open Sans, sans-serif",
  body: "Really Sans Small, Open Sans, sans-serif",
};

const linkStyles = {
  baseStyle: (props: StyleFunctionProps) => ({
    color: mode("blue.600", "blue.300")(props),
    _hover: {
      textDecoration: "underline",
    },
  }),
};

// Define the base component styles
const tabsBaseStyle = definePartsStyle({
  tab: {
    fontWeight: "semibold",
    _selected: (props: StyleFunctionProps) => ({
      borderTop: "5px solid",
      color: mode("blue.600", "blue.300")(props),
    }),
  },
});

const buttonStyles = {
  variants: {
    orange: {
      bg: "#FF9300",
      color: "white",
      _hover: {
        bg: "orange.400",
      },
      _active: {
        bg: "orange.500",
      },
    },
    "orange-outline": {
      bg: "transparent",
      color: "white",
      border: "1px solid",
      borderColor: "#FF9300",
      _hover: {
        color: "#FF9300",
      },
      _active: {
        bg: "orange.400",
      },
    },
  },
};

const inputStyles = {
  baseStyle: {
    field: {
      bg: "white",
      borderColor: "gray.300",
      borderWidth: 2,
      color: "black",
      ":focus": {
        borderColor: "#FF9300",
      },
      "::placeholder": {
        color: "gray.300",
      },
    },
    _hover: {
      borderColor: "#FF9300",
    },
  },
  defaultProps: {
    variant: null,
  },
};

const alertStyles = {
  variants: {
    orange: {
      container: {
        background: "#fff7eb",
        border: "1px solid",
        borderColor: "#FF9300",
      },
      title: {
        color: "white",
      },
    },
  },
};

// Export the component theme
export const tabsTheme = defineMultiStyleConfig({ baseStyle: tabsBaseStyle });

const theme = extendTheme({
  config,
  components: {
    Alert: alertStyles,
    Button: buttonStyles,
    Input: inputStyles,
    Link: linkStyles,
    Tabs: tabsTheme,
  },
  fonts,
});

export default theme;
