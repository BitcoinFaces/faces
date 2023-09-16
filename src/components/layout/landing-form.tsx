import {
  Alert,
  Box,
  Button,
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
  ListItem,
  Skeleton,
  OrderedList,
} from "@chakra-ui/react";
import { useAtom, useAtomValue } from "jotai";
import { loadable } from "jotai/utils";
import BitcoinFacesTextLogo from "./bitcoin-faces-text-logo";
import { selectedNameAtom } from "../../store/common";
import { useClipboardToast } from "../../hooks/use-clipboard-toast";
import { FACES_COMPONENTS, svgCodeAtom } from "../../store/faces";

function LandingForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const copyText = useClipboardToast();
  const [name, setName] = useAtom(selectedNameAtom);
  const loadNameSvgCode = loadable(svgCodeAtom);
  const nameSvgCode = useAtomValue(loadNameSvgCode);

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
            <Heading>Claim your Bitcoin Face.</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction="column" spacing={2}>
              <Box
                borderRadius="lg"
                style={{
                  overflow: "hidden",
                }}
              >
                <Skeleton isLoaded={nameSvgCode.state !== "loading"}>
                  {nameSvgCode.state === "hasData" ? (
                    <Box
                      width="100%"
                      maxW="200px"
                      maxH="200px"
                      transform="scale(0.4)"
                      transformOrigin="top left"
                      dangerouslySetInnerHTML={{ __html: nameSvgCode.data }}
                    />
                  ) : (
                    <Face width="200" height="200" />
                  )}
                </Skeleton>
              </Box>
              <Text>
                Congrats! You've generated the Bitcoin Face for{" "}
                <Box as="span" fontWeight="bold">
                  {name}
                </Box>
              </Text>
              <Text>
                The first person to inscribe each face claims ownership. First
                is first.
              </Text>
              <Stack>
                <Text fontWeight="bold">How to claim ownership:</Text>
                <OrderedList
                  stylePosition="outside"
                  marginStart={6}
                  spacing={2}
                >
                  <ListItem>
                    <Stack>
                      <Text>Save File</Text>
                      <Button
                        whiteSpace="nowrap"
                        variant="orange"
                        size={["sm", null, "md"]}
                        w="fit-content"
                        onClick={() => copyText(name)}
                      >
                        Download your face
                      </Button>
                    </Stack>
                  </ListItem>
                  <ListItem>
                    <Stack>
                      <Text>Inscribe</Text>
                      <Text>
                        Go to{" "}
                        <ChakraLink isExternal href="https://ordinalsbot.com">
                          ordinalsbot.com
                        </ChakraLink>
                        , upload your face and inscribe!
                      </Text>
                    </Stack>
                  </ListItem>
                  <ListItem>
                    <Stack>
                      <Text>Share on 𝕏</Text>
                      <Text>
                        Post a picture of your newly owned Bitcoin Face and tag
                        @bitcoinfaces
                      </Text>
                    </Stack>
                  </ListItem>
                </OrderedList>
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} borderRadius="lg">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
}

export default LandingForm;
