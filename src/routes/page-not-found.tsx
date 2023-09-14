import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

function PageNotFound() {
  const location = useLocation();
  return (
    <Flex
      direction="column"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Stack>
        <Heading>404 - not found!</Heading>
        <Text>We couldn't find that page.</Text>
        <Text>Current location: {location.pathname}</Text>
        <Text>
          Please try a different page or{" "}
          <Link to="/">click this link to return home.</Link>
        </Text>
      </Stack>
    </Flex>
  );
}

export default PageNotFound;
