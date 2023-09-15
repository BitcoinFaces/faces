import { useEffect, useState } from "react";
import { useBreakpointValue, SimpleGrid, Flex } from "@chakra-ui/react";
import BitcoinFaceLogo from "../components/layout/bitcoin-face-174-logo";
import TitleBar from "../components/layout/title-bar";
// import Logo1 from "../components/layout/Logo1";
// import Logo2 from "../components/layout/Logo2";
// ... import other logos

// const logos = [Logo1, Logo2]; // ... add other logos

function Home() {
  const [numImages, setNumImages] = useState(0);
  const size = useBreakpointValue({ base: 75, md: 100, lg: 125 }) ?? 100;
  const columns = useBreakpointValue({ base: 4, md: 6, lg: 8 }) ?? 4;

  useEffect(() => {
    const calculateImages = () => {
      const height = window.innerHeight;
      const rows = Math.floor(height / size);
      setNumImages(columns * rows);
    };

    calculateImages();
    window.addEventListener("resize", calculateImages);

    return () => {
      window.removeEventListener("resize", calculateImages);
    };
  }, [size, columns]);

  const fillGrid = () => {
    const elements = [];
    for (let i = 0; i < numImages; i++) {
      // const Logo = logos[i % logos.length];
      elements.push(
        <BitcoinFaceLogo
          key={i}
          width={size.toString()}
          height={size.toString()}
        />
      );
    }
    return elements;
  };

  return (
    <Flex direction="column" minH="100vh" alignItems="center" p={2}>
      <TitleBar />
      <SimpleGrid
        gap={2}
        templateColumns={`repeat(${columns}, ${size}px)`}
        justifyItems="center"
        alignItems="center"
      >
        {fillGrid()}
      </SimpleGrid>
      <TitleBar />
    </Flex>
  );
}

export default Home;
