import { Image } from "@chakra-ui/react";
import { memo, Dispatch, SetStateAction, useCallback } from "react";
import { StoneIndicator } from "./Board";

export const stoneSize: number = 1.75;

const stoneImgSrc = [, "/240px-Go_w.svg.png", "/240px-Go_b.svg.png"];

interface StoneProps {
  position: number;
  stoneIndicator: StoneIndicator;
  opacity?: 0 | 1;
  history: number[];
  setIsFetching: Dispatch<SetStateAction<boolean>>;
  setBoard: Dispatch<SetStateAction<StoneIndicator[]>>;
}

let count = 0;

const Stone = (props: StoneProps) => {
  const { stoneIndicator, opacity = 0, setBoard, position, history, setIsFetching } = props;

  const handleClick = useCallback(() => {
    if (opacity) return;
    history.push(position);

    setBoard(prevBoard => {
      const mutatedBoard = [...prevBoard];
      mutatedBoard[position] = StoneIndicator.BLACK;
      return mutatedBoard;
    });

    setIsFetching(true);
  }, [opacity]);

  return (
    <Image
      borderRadius="50%"
      borderWidth={0}
      boxSize={`${stoneSize}rem`}
      src={stoneImgSrc[stoneIndicator]}
      opacity={opacity}
      onClick={handleClick}
      _hover={{
        opacity: Math.max(opacity, 0.33),
      }}
    />
  );
};

export default memo(Stone);
