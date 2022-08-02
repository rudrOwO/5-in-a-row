import { Grid, GridItem } from "@chakra-ui/react";
import { memo } from "react";
import Stone, { stoneSize } from "./Stone";

const boardDimension = `${(10 + 4.5) * stoneSize}rem`;
const test = [
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0,
];

const Board = () => (
  <Grid
    gap={`${stoneSize / 2}rem`}
    width={boardDimension}
    templateRows="repeat(10, 1fr)"
    templateColumns="repeat(10, 1fr)"
  >
    {test.map((isWhite, key) => (
      <GridItem>
        {!!isWhite ? <Stone key={key} color="white" /> : <Stone key={key} color="black" />}
      </GridItem>
    ))}
  </Grid>
);

export default memo(Board);
