import { Box, Flex, Text, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Stone, { stoneSize } from "./Stone";
import LineGrid from "./LineGrid";
import BoardLock from "./BoardLock";
import UndoButton from "./UndoButton";
import ClearButton from "./ClearButton";

export const boardSize = `${(10 + (10 - 1) / 2) * stoneSize}rem`;
const stoneSpacing = `${stoneSize / 2}rem`;
export enum StoneIndicator {
  EMPTY,
  WHITE,
  BLACK,
}

const Board = () => {
  const [board, setBoard] = useState<StoneIndicator[]>(() => {
    const filler = new Array<StoneIndicator>(10 * 10); // Create empty array

    for (let i = 0; i < 10 * 10; ++i) {
      // Filling with Proper StoneIndicatorValue
      filler[i] = StoneIndicator.EMPTY;
    }

    return filler;
  });
  const history = useRef<number[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchServerRespose = useEffect(() => {
    /**
     * TODO <Dummy Fetch> Implement Later
     * * Push move to history
     * * Update move in board
     * * Update isFetching state
     */

    setTimeout(() => setIsFetching(false), 1000);
  }, [isFetching]);

  // console.log(board);
  // console.log(history);

  return (
    <Box>
      <Flex justifyContent="space-between" mb="5%">
        {isFetching ? (
          <>
            <BoardLock />
            <Text color="#141414" fontSize="xl" width="full" textAlign="center">
              Calculating ...
            </Text>
          </>
        ) : (
          <>
            <UndoButton history={history.current} setBoard={setBoard} />
            <ClearButton history={history.current} setBoard={setBoard} />
          </>
        )}
      </Flex>
      <LineGrid />
      <SimpleGrid
        position="relative"
        zIndex={1}
        columns={10}
        spacing={stoneSpacing}
      >
        {board.map((stoneIndicator, i) => (
          <Stone
            position={i}
            key={i}
            opacity={stoneIndicator === StoneIndicator.EMPTY ? 0 : 1}
            setBoard={setBoard}
            history={history.current}
            setIsFetching={setIsFetching}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Board;
