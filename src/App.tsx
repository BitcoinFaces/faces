import { ChakraProvider, Flex } from "@chakra-ui/react";
import theme from "./theme";
import CustomFonts from "./components/layout/custom-fonts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/home";
import Docs from "./routes/docs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/docs",
    element: <Docs />,
  },
]);

export const App = () => (
  <ChakraProvider theme={theme}>
    <CustomFonts />
    <Flex
      direction="column"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <RouterProvider router={router} />
    </Flex>
  </ChakraProvider>
);
