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
import { Link } from "react-router-dom";

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
        <Box alignSelf="center">
          <Link to="/">
            <Image maxW={600} src="/bitcoin-faces-social.jpeg" />
          </Link>
        </Box>
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
              unique Bitcoin Face for any name (string of text).
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
              Every name has a unique Bitcoin Face, but that face can be
              inscribed more than once.
            </ListItem>
            <ListItem>
              The first person to claim each name has first ownership. First is
              first.
            </ListItem>
          </OrderedList>
        </Alert>
        <Text>
          The original Bitcoin Faces inscriptions found between inscription
          #1,081–18,676 are not being distributed or made available via
          bitcoinfaces.xyz at this time.
        </Text>
      </Stack>
      <TitleBar align="center" />
    </Flex>
  );
}

export default Faq;
