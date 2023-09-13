import { SimpleGrid, Stack, Text } from "@chakra-ui/react";
import BitcoinFaceLogo from "./bitcoin-face-174-logo";

function Content() {
  return (
    <SimpleGrid width="100%" maxW="1200px">
      <Stack alignItems="center">
        <BitcoinFaceLogo width="250" height="250" />
        <Text fontSize="2xl">Putting names to faces.</Text>
      </Stack>
    </SimpleGrid>
  );
}

export default Content;
