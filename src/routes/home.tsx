import { Flex, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import BitcoinFaceLogo from "../components/layout/bitcoin-face-174-logo";

function Home() {
  return (
    <Flex
      direction="column"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <SimpleGrid width="100%" maxW="1200px">
        <Stack alignItems="center">
          <BitcoinFaceLogo width="300" height="300" />
          <Text fontSize="2xl">Putting names to faces.</Text>
        </Stack>
      </SimpleGrid>
    </Flex>
  );
}

export default Home;
