import { Text } from "@react-three/drei";

import { calibre400 } from "~/assets/fonts";
import { useDebug } from "~/components/canvas/Debug";
import useViewport from "~/hooks/useViewport";
import { COLORS } from "~/utils/config";

export default function About() {
  const { width, height, mobile } = useViewport();
  const debug = useDebug();

  return (
    <Text
      position={
        mobile ? [0, height * 0.03, 0] : [width * 0.1, height * 0.12, 0]
      }
      maxWidth={mobile ? width * 0.9 : width * 0.6}
      fontSize={mobile ? 0.2 : 0.3}
      textAlign="center"
      lineHeight={1.3}
      letterSpacing={0.03}
      color={COLORS.slate300}
      font={calibre400}
      depthOffset={-2}
      {...debug}
    >
      Since becoming a Comp Sci BSc Hons graduate, I have specialised in developing dynamic web applications with a passion for emerging technologies and practical problem-solving.
    </Text>
  );
}
