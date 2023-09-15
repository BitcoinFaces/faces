import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Input,
  Heading,
  Link as ChakraLink,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import BitcoinFacesTextLogo from "./bitcoin-faces-text-logo";
import { selectedNameAtom } from "../../store/common";
import { useClipboardToast } from "../../hooks/use-clipboard-toast";
import BitcoinFaceLogo from "./bitcoin-face-174-logo";

function LandingForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const copyText = useClipboardToast();
  const [name, setName] = useAtom(selectedNameAtom);

  // form submission handler
  const handleSubmit = () => {
    console.log("provided name:", name);
    setName(name);
    onOpen();
  };

  return (
    <Stack
      spacing={4}
      direction="column"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Box w="90%">
        <BitcoinFacesTextLogo />
      </Box>
      <Text textAlign="center" fontSize={["sm", null, "lg", "2xl"]}>
        Every name has a Bitcoin Face. Claim yours first.
      </Text>
      <Stack
        direction={["column", "row"]}
        alignItems="center"
        justifyContent="space-evenly"
        w="90%"
      >
        <FormControl id="name" width={["100%", "50%"]} isRequired>
          <Input
            type="text"
            placeholder="E.g. satoshi.sats"
            fontSize="xl"
            py={6}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <Button
          loadingText="Submitting"
          variant="orange"
          size="lg"
          height="52px"
          width={["100%", "50%"]}
          onClick={handleSubmit}
        >
          Claim now
        </Button>
      </Stack>
      <Modal
        allowPinchZoom
        autoFocus
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        size={["full", "full", "xl"]}
        scrollBehavior="inside"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>Ready to Inscribe</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction="column" alignItems="center" spacing={2}>
              <BitcoinFaceLogo height="200px" width="200px" />
              <Text>Selected Name: {name}</Text>
              <ButtonGroup>
                <Button
                  whiteSpace="nowrap"
                  variant="orange"
                  onClick={() => copyText(name)}
                >
                  Copy to Clipboard
                </Button>
                <Button
                  whiteSpace="nowrap"
                  variant="orange"
                  onClick={() => copyText(name)}
                >
                  Save to File
                </Button>
              </ButtonGroup>
              <Text>
                Use the "plain text" inscription type if you're using a service,
                or make sure the file's type is `.svg` if using the Ordinals
                CLI.
              </Text>
              <Text>
                See the{" "}
                <ChakraLink
                  href="https://github.com/neu-fi/awesome-ordinals"
                  isExternal
                >
                  Ordinals Awesome List
                </ChakraLink>{" "}
                for even more inscription services.{" "}
              </Text>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose} size="md" borderRadius="xl">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
}

export default LandingForm;
