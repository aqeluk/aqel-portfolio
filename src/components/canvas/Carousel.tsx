import { useState } from "react";

import {
  Box,
  Image,
  PresentationControls,
  Text,
  useCursor,
} from "@react-three/drei";
import { useGesture } from "@use-gesture/react";
import { useControls } from "leva";
import { DoubleSide, FrontSide } from "three";

import { calibre400 } from "~/assets/fonts";
import { 
  AStarChildmindingSS,
  ECEFGSS,
  SFCColchesterSS,
  TCCoatingSS,
  THYNKUNLIMITEDSS,
  VirtualCafeSS,
} from "~/assets/images";
import { useDebug } from "~/components/canvas/Debug";
import usePreventScroll from "~/hooks/usePreventScroll";
import useViewport from "~/hooks/useViewport";
import { COLORS } from "~/utils/config";

export default function Carousel(props: JSX.IntrinsicElements["group"]) {
  const { width, height, mobile } = useViewport();
  const [hover, setHover] = useState(false);
  const [textHover, setTextHover] = useState(false);
  const [drag, setDrag] = useState(false);
  const prevent = usePreventScroll();
  const debug = useDebug();

  useCursor(textHover);
  useCursor(hover, "grab");
  useCursor(drag, "grabbing", hover ? "grab" : "auto");

  const bind = useGesture({
    onPointerEnter: ({ event }) =>
      // @ts-expect-error - object is not typed
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      event.object.name === "text" ? setTextHover(true) : setHover(true),
    onPointerLeave: () => {
      setHover(false);
      setTextHover(false);
    },
    onDrag: ({ down }) => {
      prevent.current = down;
      setDrag(down);
    },
  });

  const size = mobile ? width * 0.3 : 1.5;

  return (
    <group {...props}>
      <Text
        position={[0, size * 0.5 + height * 0.1, size]}
        fontSize={mobile ? 0.3 : 0.35}
        font={calibre400}
        color={COLORS.slate300}
      >
        Personal projects
      </Text>

      <Text
        position={[0, size * 0.5 + height * 0.065, size]}
        fontSize={mobile ? 0.1 : 0.12}
        font={calibre400}
        color={COLORS.slate300}
      >
        Click Titles for Previews or Drag and Rotate
      </Text>

      <PresentationControls
        cursor={false}
        polar={[0, 0]}
        speed={mobile ? 1.5 : 2}
      >
        <group {...(bind() as JSX.IntrinsicElements["group"])} {...debug}>
          {PROJECTS.map((project, i) => (
            <Project
              key={i}
              project={project}
              rotation={[0, ((Math.PI * 2) / PROJECTS.length) * i, 0]}
              size={size}
            />
          ))}
        </group>
      </PresentationControls>
    </group>
  );
}

const ASPECT_RATIO = 1.4;

function Project({
  project: { name, url, image },
  size,
  ...props
}: {
  project: (typeof PROJECTS)[number];
  size: number;
} & JSX.IntrinsicElements["group"]) {
  const { height, mobile } = useViewport();
  const [hover, setHover] = useState(false);
  const { debugOn } = useControls({ debugOn: false });

  return (
    <group {...props}>
      <group position={[0, -0.1, (PROJECTS.length * size) / 4]}>
        <Image
          // @ts-expect-error - material.side is not typed
          ref={(ref) => ref && (ref.material.side = DoubleSide)}
          url={image}
          scale={[size * ASPECT_RATIO, size]}
        />

        <Box
          args={[size * ASPECT_RATIO, size, size * 0.5]}
          position={mobile ? [0, 0, -size * 0.25] : [0, 0, 0]}
          visible={debugOn}
          material-wireframe={true}
        />

        <Text
          scale={0.25}
          position={[0, -size * 0.5 - height * 0.05, 0]}
          onClick={() => window.open(url, "_blank")}
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          material-side={FrontSide}
          material-color={hover ? COLORS.emerald500 : COLORS.slate100}
          font={calibre400}
          fontSize={mobile ? 0.7 : 1}
          color={COLORS.slate300}
          name="text"
        >
          {name}
        </Text>
      </group>
    </group>
  );
}

const PROJECTS = [
  {
    name: "Childminding Website",
    url: "https://astarchildminding.com/",
    image: AStarChildmindingSS,
  },
  {
    name: "Cafe Java Server/Client",
    url: "https://github.com/aqeluk/virtualCafeFinal",
    image:  VirtualCafeSS,
  },
  {
    name: "Restaurant Website",
    url: "https://sfc-colchester.com/",
    image: SFCColchesterSS,
  },
  {
    name: "Paint Coating Website",
    url: "https://tccoating.com/",
    image: TCCoatingSS,
  },
  {
    name: "Amazon Web Application",
    url: "https://thynk.vercel.app/",
    image:  THYNKUNLIMITEDSS,
  },
  {
    name: "Renewable Energy Website",
    url: "https://ecefg.com/",
    image: ECEFGSS,
  },
] as const;
