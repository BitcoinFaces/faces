import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import CustomFonts from "./components/layout/custom-fonts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/home";
import ApiDocs from "./routes/api-docs";
import PageNotFound from "./routes/page-not-found";
import Faq from "./routes/faq";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/api-docs",
    element: <ApiDocs />,
  },
  {
    path: "/docs",
    element: <ApiDocs />,
  },
  {
    path: "/faq",
    element: <Faq />,
  },
]);

export const App = () => (
  <ChakraProvider theme={theme}>
    <CustomFonts />
    <RouterProvider router={router} />
  </ChakraProvider>
);
