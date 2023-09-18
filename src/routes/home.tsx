import { useBreakpointValue, SimpleGrid, Flex, Box } from "@chakra-ui/react";
import TitleBar from "../components/layout/title-bar";
import LandingForm from "../components/layout/landing-form";
import { FACES_COMPONENTS } from "../store/faces";

function Home() {
  const numImages = useBreakpointValue({ base: 152, md: 204, lg: 300 }) ?? 12;
  const size = useBreakpointValue({ base: 75, md: 100, lg: 125 }) ?? 75;
  const columns = useBreakpointValue({ base: 4, md: 6, lg: 8 }) ?? 4;

  const fillGrid = () => {
    const elements = [];
    for (let i = 0; i < numImages; i++) {
      const Face = FACES_COMPONENTS[i % FACES_COMPONENTS.length];
      elements.push(
        <Box
          key={`box-${i}`}
          borderRadius="lg"
          alignSelf="center"
          boxSize={size}
          m="auto"
        >
          {typeof Face === "function" ? (
            <Face width={size.toString()} height={size.toString()} />
          ) : (
            Face
          )}
        </Box>
      );
    }
    return elements;
  };

  return (
    <Flex direction="column" minH="100vh" alignItems="center" p={2}>
      <TitleBar align="flex-start" />
      <SimpleGrid
        gap={2}
        templateColumns={`repeat(${columns}, ${size}px)`}
        justifyItems="center"
        alignItems="center"
      >
        {fillGrid()}
        <Box
          gridColumn={{
            base: "1 / span 4",
            md: "2 / span 4",
            lg: "3 / span 4",
          }}
          gridRow={{
            base: "3 / span 3",
            md: "3 / span 3",
          }}
          w="100%"
          h="100%"
        >
          <LandingForm />
        </Box>
      </SimpleGrid>
      <TitleBar align="center" />
    </Flex>
  );
}

export default Home;
