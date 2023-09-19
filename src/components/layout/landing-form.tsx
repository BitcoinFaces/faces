import {
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
  Skeleton,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";

import { useAtom, useAtomValue } from "jotai";
import { loadable } from "jotai/utils";
import BitcoinFacesTextLogo from "./bitcoin-faces-text-logo";
import { selectedNameAtom } from "../../store/common";
import { useClipboardToast } from "../../hooks/use-clipboard-toast";
import {
  GAMMA_CREATE_URL,
  nameDataAtom,
  ORDINALSBOT_CREATE_URL,
} from "../../store/faces";
import { FaCode, FaDownload } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function LandingForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const copyText = useClipboardToast();
  const [name, setName] = useAtom(selectedNameAtom);
  const loadNameData = loadable(nameDataAtom);
  const nameData = useAtomValue(loadNameData);

  // form submission handler
  const handleSubmit = () => {
    if (!name) return;
    setName(name);
    onOpen();
  };

  const handleDownload = () => {
    if (nameData.state === "hasData" && nameData.data) {
      const svgBlob = new Blob([nameData.data.svgCode.onchain], {
        type: "image/svg+xml;charset=utf-8",
      });
      const svgUrl = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement("a");
      downloadLink.href = svgUrl;
      downloadLink.download = `${name}.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

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
            placeholder="E.g. satoshi"
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
            <Stack direction="column" spacing={4}>
              <Stack>
                <Skeleton isLoaded={nameData.state !== "loading"}>
                  <Box
                    borderRadius="lg"
                    alignSelf="center"
                    boxSize={[200, null, 300]}
                    m="auto"
                  >
                    {nameData.state === "hasData" && nameData.data && (
                      <Box
                        h="100%"
                        w="100%"
                        dangerouslySetInnerHTML={{
                          __html: nameData.data.svgCode.local,
                        }}
                      />
                    )}
                  </Box>
                </Skeleton>
                <ButtonGroup alignSelf="center" size="lg">
                  <IconButton
                    aria-label="Download Bitcoin Face"
                    title="Download Bitcoin Face"
                    icon={<FaDownload />}
                    disabled={nameData.state === "loading"}
                    onClick={handleDownload}
                  />
                  <IconButton
                    aria-label="Copy Source Code"
                    title="Copy Source Code"
                    icon={<FaCode />}
                    disabled={nameData.state === "loading"}
                    onClick={() => {
                      if (nameData.state === "hasData" && nameData.data) {
                        copyText(nameData.data.svgCode.onchain);
                      }
                    }}
                  />
                  <IconButton
                    aria-label="Share on X (Twitter)"
                    title="Share on X (Twitter)"
                    icon={<FaXTwitter />}
                    as="a"
                    href={`https://twitter.com/intent/tweet?text=${name}%20%2B%20%40bitcoinfaces%20%3D%20%F0%9F%91%B9%0A%0A&url=https%3A%2F%2Fbitcoinfaces.xyz`}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                </ButtonGroup>
              </Stack>
              <Stack>
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
              </Stack>
              <Text fontWeight="bold" fontSize="xl">
                Inscribe with:
              </Text>
              <ButtonGroup
                size={["md", null, "lg"]}
                variant="orange"
                alignSelf="center"
              >
                <Button
                  whiteSpace="nowrap"
                  isDisabled={nameData.state === "loading"}
                  as={ChakraLink}
                  href={ORDINALSBOT_CREATE_URL(name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  OrdinalsBot
                </Button>
                <Button
                  whiteSpace="nowrap"
                  isDisabled={nameData.state === "loading"}
                  as={ChakraLink}
                  href={GAMMA_CREATE_URL(name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  Gamma
                </Button>
              </ButtonGroup>
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
