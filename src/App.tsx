import { ChakraProvider, Flex } from "@chakra-ui/react";
import theme from "./theme";
import Content from "./components/layout/page-content";
import CustomFonts from "./components/layout/custom-fonts";

export const App = () => (
  <ChakraProvider theme={theme}>
    <CustomFonts />
    <Flex
      direction="column"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Content />
    </Flex>
  </ChakraProvider>
);
