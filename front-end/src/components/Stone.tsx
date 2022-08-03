import { Image } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import { memo, Dispatch, SetStateAction, useCallback } from "react";
import { StoneIndicator } from "./Board";

export const stoneSize: number = 1.75;

const stoneImgSrc = {
  white: "src/assets/240px-Go_w.svg.png",
  black: "src/assets/240px-Go_b.svg.png",
};

interface StoneProps {
  position: {
    x: number;
    y: number;
  };
  color?: "white" | "black";
  opacity?: 0 | 1;
  setBoard: Dispatch<SetStateAction<StoneIndicator[][]>>;
}

const Stone = (props: StoneProps) => {
  const { color = "white", opacity = 0, setBoard, position } = props;

  console.log(`Re-render at ${position.y}, ${position.x}`);

  const handleClick = useCallback(() => {
    if (opacity) return;
    const { x, y } = position;

    setBoard(prevBoard => {
      const mutatedBoard = [...prevBoard];
      mutatedBoard[y][x] = color === "white" ? "w" : "b";

      return mutatedBoard;
    });
  }, [opacity]);

  return (
    <Image
      borderRadius="50%"
      borderWidth={0}
      boxSize={`${stoneSize}rem`}
      src={stoneImgSrc[color]}
      opacity={opacity}
      onClick={handleClick}
    />
  );
};

export default memo(Stone);
