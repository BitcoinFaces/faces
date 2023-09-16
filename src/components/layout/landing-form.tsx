import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
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
  UnorderedList,
  ListItem,
  Code,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import BitcoinFacesTextLogo from "./bitcoin-faces-text-logo";
import { selectedNameAtom } from "../../store/common";
import { useClipboardToast } from "../../hooks/use-clipboard-toast";
import { FACES_COMPONENTS } from "../../store/faces";

function LandingForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const copyText = useClipboardToast();
  const [name, setName] = useAtom(selectedNameAtom);

  // form submission handler
  const handleSubmit = () => {
    console.log("provided name:", name);
    if (!name) return;
    setName(name);
    onOpen();
  };

  const Face = FACES_COMPONENTS[25];

  return (
    <Stack
      spacing={4}
      direction="column"
      height="100%"
      alignItems="center"
      justifyContent="center"
      py={2}
    >
      <Box w="90%">
        <BitcoinFacesTextLogo />
      </Box>
      <Text
        textAlign="center"
        fontWeight="bold"
        fontSize={["xl", null, "3xl", "4xl"]}
      >
        Every name has a Bitcoin Face. Claim yours first.
      </Text>
      <Stack
        direction={["column", null, "row"]}
        alignItems="center"
        justifyContent="space-evenly"
        w="90%"
      >
        <FormControl id="name" width={["100%", null, "50%"]} isRequired>
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
          width={["100%", null, "50%"]}
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
        size="xl"
        scrollBehavior="inside"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>Save your Face</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction="column" alignItems="center" spacing={2}>
              <Box
                width="200"
                height="200"
                borderRadius="lg"
                style={{
                  overflow: "hidden",
                }}
              >
                <Face width="200" height="200" />
              </Box>
              <Text>
                Selected Name:{" "}
                <Box as="span" fontWeight="bold">
                  {name}
                </Box>
              </Text>
              <Alert variant="orange">
                <Stack>
                  <Text>Inscribe your image to save your face.</Text>
                  <Text>You can copy the code or download it.</Text>
                  <Text>
                    The correct mime-type is{" "}
                    <Code style={{ backgroundColor: "#fff7eb" }}>
                      image/svg+xml
                    </Code>
                  </Text>
                  <Text>
                    Upload to an inscription service like:
                    <UnorderedList>
                      <ListItem>Ordinals Bot</ListItem>
                      <ListItem>Unisat</ListItem>
                      <ListItem>OrdSwap</ListItem>
                      <ListItem>could find more</ListItem>
                      <ListItem>could link awesome list</ListItem>
                    </UnorderedList>
                  </Text>
                </Stack>
              </Alert>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup size={["sm", null, "md"]}>
              <Button
                whiteSpace="nowrap"
                variant="orange"
                onClick={() => copyText(name)}
              >
                Save to File
              </Button>
              <Button
                whiteSpace="nowrap"
                variant="orange"
                onClick={() => copyText(name)}
              >
                Copy Code to Clipboard
              </Button>
              <Button variant="orange" onClick={onClose} borderRadius="lg">
                Close
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
}

export default LandingForm;
