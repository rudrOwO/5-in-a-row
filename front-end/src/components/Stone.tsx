import { chakra } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import { memo } from "react";

export const stoneSize: number = 1.75;

const stoneImgSrc = {
  white: "src/assets/240px-Go_w.svg.png",
  black: "src/assets/240px-Go_b.svg.png",
};

interface Props {
  position: {
    x: number;
    y: number;
  };
  color?: "white" | "black";
  visibility?: "hidden" | "visible";
}

const AnimatedImg = chakra(motion.img, {
  shouldForwardProp: (prop: string) =>
    isValidMotionProp(prop) || prop === "src",
});

const Stone = ({ color = "white", visibility = "hidden" }: Props) => (
  <AnimatedImg
    borderRadius="50%"
    borderWidth={0}
    boxSize={`${stoneSize}rem`}
    src={stoneImgSrc[color]}
    visibility={visibility}
    animate={{ scale: [0.2, 1] }}
    //@ts-ignore
    transition={{ duration: 0.2 }}
  />
);

export default memo(Stone);
