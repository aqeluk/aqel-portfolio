import { useState } from "react";
import {
  Center,
  Decal,
  Float,
  Html,
  Icosahedron,
  useTexture,
} from "@react-three/drei";
import { useControls } from "leva";

import {
  html,
  javascript,
  nextjs,
  nodejs,
  tailwindcss,
  nestjs,
  typescript,
} from "~/assets/logos";
import { useDebug } from "~/components/canvas/Debug";
import useViewport from "~/hooks/useViewport";
import { COLORS } from "~/utils/config";

export default function TechLogos() {
  const { mobile, width, height } = useViewport();

  const gap = (width * 0.8) / LOGOS.length;

  return (
    <Center position={[0, -height * 0.25, 0]} disableZ disableY>
      {LOGOS.map((ball, i) => (
        <Ball
          key={ball.name}
          ball={ball}
          position={
            mobile
              ? [gap * i, i % 2 ? -gap * 2 : 0, 0]
              : [gap * i, i % 2 ? -gap * 0.5 : 0, 0]
          }
          scale={mobile ? 0.2 : 0.3}
          last={i === LOGOS.length - 1}
        />
      ))}
    </Center>
  );
}

function Ball({
  ball: { name, src, scale },
  last,
  ...props
}: {
  ball: (typeof LOGOS)[number];
  last: boolean;
} & JSX.IntrinsicElements["group"]) {
  const { debugOn } = useControls({ debugOn: false });
  const texture = useTexture(src);
  const debug = useDebug();
  const [showModal, setModal] = useState(false);
  const { mobile } = useViewport();

  return (
    <group {...props} {...debug}>
      <Float speed={4}>
        <Icosahedron
          args={[1, 4]}
          onPointerEnter={() => !mobile && setModal(true)}
          onPointerLeave={() => !mobile && setModal(false)}
          onPointerDown={() => setModal(true)}
          onPointerMissed={() => setModal(false)}
        >
          <meshStandardMaterial color={COLORS.slate100} flatShading />
          <Decal
            map={texture}
            position={[0, 0, 1]}
            rotation={[Math.PI * 2, 0, 0]}
            scale={1.2 * scale}
            debug={debugOn}
            // flatShading
          />
        </Icosahedron>
      </Float>

      {showModal && (
        <Html position={mobile && last ? [-0.5, -0.5, 0] : [0.5, -0.5, 0]}>
          <div className="rounded border border-cyan-800 bg-cyan-950 p-2 text-center">
            <p>{name}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

export const LOGOS = [
  { name: "HTML/CSS", src: html, scale: 1 },
  { name: "Javascript", src: javascript, scale: 1 },
  { name: "Typescript", src: typescript, scale: 1 },
  { name: "Next.js", src: nextjs, scale: 1 },
  { name: "NestJS", src: nestjs, scale: 1 },
  { name: "Tailwind", src: tailwindcss, scale: 1 },
  { name: "Node.js", src: nodejs, scale: 1 },
] as const;
