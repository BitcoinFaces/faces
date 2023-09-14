import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import CustomFonts from "./components/layout/custom-fonts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/home";
import Docs from "./routes/docs";
import PageNotFound from "./routes/page-not-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/docs",
    element: <Docs />,
  },
]);

export const App = () => (
  <ChakraProvider theme={theme}>
    <CustomFonts />
    <RouterProvider router={router} />
  </ChakraProvider>
);
