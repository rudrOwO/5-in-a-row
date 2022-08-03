import { VStack, HStack, Box } from "@chakra-ui/react";
import { useState } from "react";
import Stone, { stoneSize } from "./Stone";
import Grid from "./Grid";

export const boardSize = `${(10 + (10 - 1) / 2) * stoneSize}rem`;
export const boardDimension = 10;
export type StoneIndicator = "w" | "b" | "";

const Board = () => {
  const [board, setBoard] = useState<StoneIndicator[][]>(() => {
    const filler = new Array<StoneIndicator[]>(boardDimension); // Create empty array

    // Filling with Proper StoneIndicatorValue
    for (let i = 0; i < boardDimension; ++i) {
      filler[i] = new Array<StoneIndicator>(boardDimension);

      for (let j = 0; j < boardDimension; ++j) {
        filler[i][j] = "";
      }
    }

    return filler;
  });

  return (
    <Box>
      <Grid />
      <VStack position="relative" zIndex={2} spacing={`${stoneSize / 2}rem`}>
        {board.map((stoneRow, y) => (
          <HStack key={y} spacing={`${stoneSize / 2}rem`}>
            {stoneRow.map((stoneIndicator, x) => (
              <Stone
                position={{ x, y }}
                key={x}
                opacity={stoneIndicator === "" ? 0 : 1}
                color={stoneIndicator === "w" ? "white" : "black"}
                setBoard={setBoard}
              />
            ))}
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Board;
