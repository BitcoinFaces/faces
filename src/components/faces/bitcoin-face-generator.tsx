import { Box, Skeleton } from "@chakra-ui/react";
import { BitcoinFaceLogoProps, nameDataAtomFamily } from "../../store/faces";
import { loadable } from "jotai/utils";
import { useAtomValue } from "jotai";

const BitcoinFaceGenerator = (
  props: BitcoinFaceLogoProps & { name: string }
) => {
  const nameDataAtom = nameDataAtomFamily(props.name);
  //const loadNameData = loadable(nameDataAtom);
  //const nameData = useAtomValue(loadNameData);
  const nameData = { state: "loading", data: undefined };

  return (
    <Skeleton isLoaded={nameData.state !== "loading"}>
      {nameData.state === "hasData" && nameData.data && (
        <Box
          h={props.height}
          w={props.width}
          dangerouslySetInnerHTML={{
            __html: "", // nameData.data.svgCode.local,
          }}
        />
      )}
    </Skeleton>
  );
};

export default BitcoinFaceGenerator;
