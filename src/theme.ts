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
  useSystemColorMode: true,
  cssVarPrefix: "citycoin",
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

// Export the component theme
export const tabsTheme = defineMultiStyleConfig({ baseStyle: tabsBaseStyle });

const theme = extendTheme({
  config,
  components: {
    Link: linkStyles,
    Tabs: tabsTheme,
  },
  fonts,
});

export default theme;
