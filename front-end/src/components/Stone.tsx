import { Image } from "@chakra-ui/react";
import { memo, Dispatch, SetStateAction, useCallback } from "react";
import { StoneIndicator } from "./Board";

export const stoneSize: number = 1.75;

const stoneImgSrc = [
  ,
  "src/assets/240px-Go_w.svg.png",
  "src/assets/240px-Go_b.svg.png",
];

interface StoneProps {
  position: {
    x: number;
    y: number;
  };
  stoneIndicator?: StoneIndicator;
  opacity?: 0 | 1;
  history: { x: number; y: number }[];
  isFetching: boolean;
  setIsFetching: Dispatch<SetStateAction<boolean>>;
  setBoard: Dispatch<SetStateAction<StoneIndicator[][]>>;
}

const Stone = (props: StoneProps) => {
  const {
    stoneIndicator = StoneIndicator.BLACK,
    opacity = 0,
    setBoard,
    position,
    history,
    isFetching,
    setIsFetching,
  } = props;

  const handleClick = useCallback(() => {
    if (opacity || isFetching) return;
    history.push(position);

    setBoard(prevBoard => {
      const mutatedBoard = [...prevBoard];
      mutatedBoard[position.y][position.x] = StoneIndicator.BLACK;
      return mutatedBoard;
    });

    setIsFetching(true);
  }, [opacity, isFetching]);

  return (
    <Image
      borderRadius="50%"
      borderWidth={0}
      boxSize={`${stoneSize}rem`}
      src={stoneImgSrc[stoneIndicator]}
      opacity={opacity}
      onClick={handleClick}
      _hover={{
        opacity: opacity === 1 ? 1 : isFetching ? 0 : 0.33,
      }}
    />
  );
};

export default memo(
  Stone,
  (prevProps: StoneProps, nextProps: StoneProps) =>
    prevProps.opacity === nextProps.opacity &&
    prevProps.isFetching === nextProps.isFetching
);
