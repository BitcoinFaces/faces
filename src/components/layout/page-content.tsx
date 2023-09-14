import { SimpleGrid, Stack, Text } from "@chakra-ui/react";
import BitcoinFaceLogo from "./bitcoin-face-174-logo";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

function Content() {
  return <SwaggerUI url="/openapi_spec.json" />;

  // temporary testing
  return (
    <SimpleGrid width="100%" maxW="1200px">
      <Stack alignItems="center">
        <BitcoinFaceLogo width="300" height="300" />
        <Text fontSize="2xl">Putting names to faces.</Text>
      </Stack>
    </SimpleGrid>
  );
}

export default Content;
