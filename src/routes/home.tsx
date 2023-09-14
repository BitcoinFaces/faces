import { useEffect, useState } from "react";
import { useBreakpointValue, SimpleGrid, Flex } from "@chakra-ui/react";
import BitcoinFaceLogo from "../components/layout/bitcoin-face-174-logo";

function Home() {
  const [numImages, setNumImages] = useState(0);
  const size = useBreakpointValue({ base: 50, md: 100, lg: 150 }) ?? 50;

  useEffect(() => {
    const calculateImages = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const columns = Math.floor(width / size);
      const rows = Math.floor(height / size);
      setNumImages(columns * rows * 2); // Generate extra to fill screen
    };

    calculateImages();
    window.addEventListener("resize", calculateImages);

    return () => {
      window.removeEventListener("resize", calculateImages);
    };
  }, [size]);

  return (
    <Flex
      direction="column"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      p={2}
    >
      <SimpleGrid
        width="100%"
        maxW="100%"
        spacing={0}
        templateColumns={`repeat(auto-fill, minmax(${size}px, 1fr))`}
      >
        {Array.from({ length: numImages }, (_, i) => (
          <BitcoinFaceLogo
            key={i}
            width={size.toString()}
            height={size.toString()}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
}

export default Home;
