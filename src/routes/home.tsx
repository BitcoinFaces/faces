import { useEffect, useState } from "react";
import { useBreakpointValue, SimpleGrid, Flex, Box } from "@chakra-ui/react";
import BitcoinFaceLogo from "../components/layout/bitcoin-face-174-logo";
import TitleBar from "../components/layout/title-bar";
import LandingForm from "../components/layout/landing-form";
import BitcoinFace1 from "../components/faces/bitcoin-face-1";
import BitcoinFace2 from "../components/faces/bitcoin-face-2";
import BitcoinFace3 from "../components/faces/bitcoin-face-3";
import BitcoinFace4 from "../components/faces/bitcoin-face-4";
import BitcoinFace5 from "../components/faces/bitcoin-face-5";
import BitcoinFace6 from "../components/faces/bitcoin-face-6";
import BitcoinFace7 from "../components/faces/bitcoin-face-7";
import BitcoinFace8 from "../components/faces/bitcoin-face-8";
import BitcoinFace9 from "../components/faces/bitcoin-face-9";
import BitcoinFace10 from "../components/faces/bitcoin-face-10";
import BitcoinFace11 from "../components/faces/bitcoin-face-11";
import BitcoinFace12 from "../components/faces/bitcoin-face-12";
import BitcoinFace13 from "../components/faces/bitcoin-face-13";
import BitcoinFace14 from "../components/faces/bitcoin-face-14";
import BitcoinFace15 from "../components/faces/bitcoin-face-15";
import BitcoinFace16 from "../components/faces/bitcoin-face-16";
import BitcoinFace17 from "../components/faces/bitcoin-face-17";
import BitcoinFace18 from "../components/faces/bitcoin-face-18";
import BitcoinFace19 from "../components/faces/bitcoin-face-19";
import BitcoinFace20 from "../components/faces/bitcoin-face-20";
import BitcoinFace21 from "../components/faces/bitcoin-face-21";
import BitcoinFace22 from "../components/faces/bitcoin-face-22";
import BitcoinFace23 from "../components/faces/bitcoin-face-23";
import BitcoinFace24 from "../components/faces/bitcoin-face-24";
import BitcoinFace25 from "../components/faces/bitcoin-face-25";
import BitcoinFace26 from "../components/faces/bitcoin-face-26";
import BitcoinFace27 from "../components/faces/bitcoin-face-27";
import BitcoinFace28 from "../components/faces/bitcoin-face-28";
import BitcoinFace29 from "../components/faces/bitcoin-face-29";
import BitcoinFace30 from "../components/faces/bitcoin-face-30";

const faces = [
  BitcoinFace1,
  BitcoinFace2,
  BitcoinFace3,
  BitcoinFace4,
  BitcoinFace5,
  BitcoinFace6,
  BitcoinFace7,
  BitcoinFace8,
  BitcoinFace9,
  BitcoinFace10,
  BitcoinFace11,
  BitcoinFace12,
  BitcoinFace13,
  BitcoinFace14,
  BitcoinFace15,
  BitcoinFace16,
  BitcoinFace17,
  BitcoinFace18,
  BitcoinFace19,
  BitcoinFace20,
  BitcoinFace21,
  BitcoinFace22,
  BitcoinFace23,
  BitcoinFace24,
  BitcoinFace25,
  BitcoinFace26,
  BitcoinFace27,
  BitcoinFace28,
  BitcoinFace29,
  BitcoinFace30,
];

function Home() {
  // const [numImages, setNumImages] = useState(0);
  const numImages = useBreakpointValue({ base: 24, md: 54, lg: 76 }) ?? 12;
  const size = useBreakpointValue({ base: 75, md: 100, lg: 125 }) ?? 75;
  const columns = useBreakpointValue({ base: 4, md: 6, lg: 8 }) ?? 4;

  /*
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
  */

  const fillGrid = () => {
    const elements = [];
    for (let i = 0; i < numImages; i++) {
      const Face = faces[i % faces.length];
      elements.push(
        <Box
          key={`box-${i}`}
          width={size.toString()}
          height={size.toString()}
          borderRadius="full"
        >
          <Face width={size.toString()} height={size.toString()} />
        </Box>
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
      <TitleBar />
    </Flex>
  );
}

export default Home;
