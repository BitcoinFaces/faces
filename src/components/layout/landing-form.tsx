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
  Stack,
  Text,
  useDisclosure,
  Skeleton,
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
      <Text fontWeight="bold" fontSize={["xl", null, "3xl", "4xl"]}>
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
          <ModalHeader mt={4}>
            <Heading textAlign="center" size="xl">
              Congrats, a new face!
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <Stack spacing={4} mb={8}>
              <Text fontSize="md">
                The first person to inscribe each face claims ownership. First
                is first.
              </Text>
              <Skeleton isLoaded={nameData.state !== "loading"}>
                <Box borderRadius="lg" boxSize={[200, null, 300]} m="auto">
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
              <Text fontWeight="bold" fontSize="3xl" mb={4}>
                {name}
              </Text>
              <Stack
                direction={["column", null, "row"]}
                alignItems="center"
                justifyContent="space-evenly"
              >
                <Stack direction="column">
                  <Text fontWeight="bold" fontSize="lg" textAlign="left">
                    Share:
                  </Text>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <IconButton
                      aria-label="Download Bitcoin Face"
                      title="Download Bitcoin Face"
                      size="lg"
                      icon={<FaDownload />}
                      disabled={nameData.state === "loading"}
                      onClick={handleDownload}
                    />
                    <IconButton
                      aria-label="Copy Source Code"
                      title="Copy Source Code"
                      size="lg"
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
                      size="lg"
                      icon={<FaXTwitter />}
                      as="a"
                      href={`https://twitter.com/intent/tweet?text=${name}%20%2B%20%40bitcoinfaces%20%3D%20%F0%9F%91%B9%0A%0A&url=https%3A%2F%2Fbitcoinfaces.xyz`}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  </Stack>
                </Stack>
                <Stack direction="column">
                  <Text fontWeight="bold" fontSize="lg" textAlign="left">
                    Inscribe:
                  </Text>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Button
                      whiteSpace="nowrap"
                      isDisabled={nameData.state === "loading"}
                      size={["md", null, "lg"]}
                      variant="orange"
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
                      size={["md", null, "lg"]}
                      variant="orange"
                      as={ChakraLink}
                      href={GAMMA_CREATE_URL(name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      Gamma
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
}

export default LandingForm;
