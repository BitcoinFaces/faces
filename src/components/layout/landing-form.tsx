import {
  Box,
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
    </Stack>
  );
}

export default LandingForm;
