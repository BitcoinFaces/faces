import { ButtonGroup, IconButton, Stack } from "@chakra-ui/react";
import { FaBook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function TitleBar() {
  return (
    <Stack
      align="flex-end"
      justifyContent="flex-end"
      direction="row"
      width="100%"
      maxW={1600}
      py={2}
    >
      <ButtonGroup>
        <IconButton
          aria-label="API Documentation"
          title="API Documentation"
          variant="ghost"
          icon={<FaBook />}
          as="a"
          href="https://bitcoinfaces.xyz/api-docs"
          target="_blank"
          rel="noopener noreferrer"
        />
        <IconButton
          aria-label="Twitter"
          title="Twitter"
          variant="ghost"
          icon={<FaXTwitter />}
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
