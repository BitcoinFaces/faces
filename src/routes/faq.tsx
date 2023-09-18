import {
  Alert,
  Box,
  Flex,
  Heading,
  Image,
  ListItem,
  OrderedList,
  Stack,
  Text,
} from "@chakra-ui/react";
import TitleBar from "../components/layout/title-bar";
import BitcoinFacesTextLogo from "../components/layout/bitcoin-faces-text-logo";

function Faq() {
  return (
    <Flex
      direction="column"
      minH="100vh"
      alignItems="center"
      justifyContent="flex-start"
      p={2}
      mt={4}
    >
      <Stack
        spacing={4}
        alignItems="flex-start"
        justifyContent="flex-start"
        maxW={1200}
      >
        <Image maxW={600} alignSelf="center" src="/bitcoin-faces-social.jpeg" />
        <Heading>FAQ</Heading>
        <Text>
          Bitcoin Faces is{" "}
          <Box as="span" fontWeight="bold">
            *not*
          </Box>{" "}
          like many other Ordinals collections.
        </Text>
        <Alert
          variant="orange"
          flexDir="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Text fontWeight="bold" mb={4}>
            HOW IT WORKS:
          </Text>
          <OrderedList ms={6}>
            <ListItem>
              Bitcoinfaces.xyz allows anybody to deterministically generate a
              unique Bitcoin Face for any name.
            </ListItem>
            <ListItem>
              Upon generation, you may choose to inscribe that face as a new
              Ordinal inscription.
            </ListItem>
            <ListItem>
              All faces are free to mint, the only cost to inscribe your face
              are the associated fees.
            </ListItem>
            <ListItem>
              Every name has a unique Bitcoin Face, but can be inscribed more
              than once.
            </ListItem>
            <ListItem>
              The first person to claim each name has first ownership. First is
              first.
            </ListItem>
          </OrderedList>
        </Alert>
        <Text>
          The original Bitcoin Faces inscriptions found between inscription
          #1,081–18,676 are separate from the generator on bitcoinfaces.xyz. The
          original Ordinals are not being distributed or made available via
          bitcoinfaces.xyz at this time.
        </Text>
      </Stack>
      <TitleBar align="center" />
    </Flex>
  );
}

export default Faq;
