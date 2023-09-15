import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import BitcoinFaceLogo from "./bitcoin-face-174-logo";

function TitleBar() {
  return (
    <Stack
      align="center"
      direction={["column", "row"]}
      width="100%"
      maxW={1600}
      py={2}
    >
      <Flex flexGrow="1" align="center">
        <BitcoinFaceLogo width="45px" height="45px" />
        <Heading size="md" ml={2}>
          Bitcoin Faces
        </Heading>
      </Flex>
      <Stack direction={["column", "row"]} alignItems="center">
        <Button
          as="a"
          title="About"
          variant="ghost"
          href="https://bitcoinfaces.xyz/api/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          API Docs
        </Button>
        <Button
          as="a"
          title="About"
          variant="ghost"
          href="https://twitter.com/bitcoinfaces"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </Button>
      </Stack>
    </Stack>
  );
}

export default TitleBar;
