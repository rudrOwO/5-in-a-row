import { chakra } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import { memo } from "react";

export const stoneSize: number = 1.75;

const stoneImgSrc = {
  white: "src/assets/240px-Go_w.svg.png",
  black: "src/assets/240px-Go_b.svg.png",
};

interface Props {
  color: "white" | "black";
}

const AnimatedImg = chakra(motion.img, {
  shouldForwardProp: (prop: string) => isValidMotionProp(prop) || prop === "src",
});

const Stone = ({ color }: Props) => (
  <AnimatedImg
    borderRadius="50%"
    boxSize={`${stoneSize}rem`}
    src={stoneImgSrc[color]}
    animate={{ scale: [0.2, 1] }}
    //@ts-ignore
    transition={{ duration: 0.2 }}
  />
);

export default memo(Stone);
