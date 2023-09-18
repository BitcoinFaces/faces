import { Box, Skeleton } from "@chakra-ui/react";
import { BitcoinFaceLogoProps, nameDataAtomFamily } from "../../store/faces";
import { loadable } from "jotai/utils";
import { useAtomValue } from "jotai";

const BitcoinFaceGenerator = (
  props: BitcoinFaceLogoProps & { name: string }
) => {
  const nameDataAtom = nameDataAtomFamily(props.name);
  const loadNameData = loadable(nameDataAtom);
  const nameData = useAtomValue(loadNameData);

  return (
    <Skeleton isLoaded={nameData.state !== "loading"} fadeDuration={0}>
      {nameData.state === "hasData" && nameData.data ? (
        <Box
          h={props.height}
          w={props.width}
          dangerouslySetInnerHTML={{
            __html: nameData.data.svgCode.local,
          }}
        />
      ) : (
        <Box h={props.height} w={props.width} />
      )}
    </Skeleton>
  );
};

export default BitcoinFaceGenerator;
