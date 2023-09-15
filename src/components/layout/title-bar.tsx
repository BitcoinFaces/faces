import {
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { FaBook, FaTwitter } from "react-icons/fa";
import BitcoinFaceLogo from "./bitcoin-face-174-logo";

function TitleBar() {
  return (
    <Stack align="center" direction="row" width="100%" maxW={1600} py={2}>
      <Flex flexGrow="1" align="center">
        <BitcoinFaceLogo width="45px" height="45px" />
        <Heading size="md" ml={2}>
          Bitcoin Faces
        </Heading>
      </Flex>
      <ButtonGroup>
        <IconButton
          aria-label="API Documentation"
          title="API Documentation"
          variant="ghost"
          icon={<FaBook />}
          as="a"
          href="https://bitcoinfaces.xyz/api/docs"
          target="_blank"
          rel="noopener noreferrer"
        />
        <IconButton
          aria-label="Twitter"
          title="Twitter"
          variant="ghost"
          icon={<FaTwitter />}
          as="a"
          href="https://twitter.com/bitcoinfaces"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </IconButton>
      </ButtonGroup>
    </Stack>
  );
}

export default TitleBar;

/*
<IconButton
  aria-label="GitHub"
  title="GitHub"
  variant="ghost"
  icon={<FaGithub />}
  size="lg"
  as="a"
  href="https://github.com/bitcoinfaces"
  target="_blank"
  rel="noopener noreferrer"
/>
*/
