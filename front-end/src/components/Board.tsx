import { VStack, HStack, Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Stone, { stoneSize } from "./Stone";
import Grid from "./Grid";
import UndoButton from "./UndoButton";
import ClearButton from "./ClearButton";

export const boardSize = `${(10 + (10 - 1) / 2) * stoneSize}rem`;
export const boardDimension = 10;
export enum StoneIndicator {
  EMPTY,
  WHITE,
  BLACK,
}

const Board = () => {
  const [board, setBoard] = useState<StoneIndicator[][]>(() => {
    const filler = new Array<StoneIndicator[]>(boardDimension); // Create empty array

    // Filling with Proper StoneIndicatorValue
    for (let i = 0; i < boardDimension; ++i) {
      filler[i] = new Array<StoneIndicator>(boardDimension);

      for (let j = 0; j < boardDimension; ++j) {
        filler[i][j] = StoneIndicator.EMPTY;
      }
    }

    return filler;
  });
  const history = useRef<{ x: number; y: number }[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchServerRespose = useEffect(() => {
    /**
     * TODO <Dummy Fetch> Implement Later
     * * Push move to history
     * * Update move in board
     * * Update isFetching state
     */

    console.log("FETCHING");
    setTimeout(() => setIsFetching(false), 200);
  }, [isFetching]);

  // console.log(board);
  // console.log(history);

  return (
    <Box>
      <Flex justifyContent="space-between" mb="5%">
        {isFetching ? (
          <Text color="#141414" fontSize="xl" width="full" textAlign="center">
            Calculating ...
          </Text>
        ) : (
          <>
            <UndoButton history={history.current} setBoard={setBoard} />
            <ClearButton setBoard={setBoard} />
          </>
        )}
      </Flex>
      <Grid />
      <VStack
        position="relative"
        zIndex={2}
        spacing={`${stoneSize / 2}rem`}
        _hover={{
          cursor: isFetching ? "not-allowed" : "auto",
        }}
      >
        {board.map((stoneRow, y) => (
          <HStack key={y} spacing={`${stoneSize / 2}rem`}>
            {stoneRow.map((stoneIndicator, x) => (
              <Stone
                position={{ x, y }}
                key={x}
                opacity={stoneIndicator === StoneIndicator.EMPTY ? 0 : 1}
                setBoard={setBoard}
                history={history.current}
                isFetching={isFetching}
                setIsFetching={setIsFetching}
              />
            ))}
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Board;
