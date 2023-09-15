import {
  Button,
  FormControl,
  Input,
  Stack,
  Text,
  useControllableState,
} from "@chakra-ui/react";
import BitcoinFacesTextLogo from "./bitcoin-faces-text-logo";

function LandingForm() {
  // form field
  const [name, setName] = useControllableState({ defaultValue: "" });

  // form submission handler
  const handleSubmit = () => {
    console.log("provided name:", name);
    // fetch from API (or use functions directly?)
    // open modal with information
  };

  return (
    <Stack spacing={6} direction="column" w="100%" maxW="600px" m="0 auto">
      <BitcoinFacesTextLogo />
      <Text>Every name has a Bitcoin Face. Claim yours first.</Text>
      <FormControl id="name" isRequired>
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
        size="lg"
        height="52px"
        onClick={handleSubmit}
      >
        Claim now
      </Button>
    </Stack>
  );
}

export default LandingForm;
