import { useToast } from "@chakra-ui/react";
import copy from "copy-to-clipboard";

export const useClipboardToast = () => {
  const toast = useToast();

  return (text: string | null) => {
    if (!text) {
      toast({
        title: `No text to copy`,
        description: "Please refresh and try again",
        position: "top",
        status: "warning",
        variant: "solid",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const copyStatus = copy(text);
    if (copyStatus) {
      toast({
        title: `Copied text to clipboard`,
        description: text,
        position: "top",
        status: "success",
        variant: "solid",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: `Unable to copy text to clipboard`,
        description: "Please refresh and try again, or copy manually",
        position: "top",
        status: "warning",
        variant: "solid",
        duration: 3000,
        isClosable: true,
      });
    }
  };
};
