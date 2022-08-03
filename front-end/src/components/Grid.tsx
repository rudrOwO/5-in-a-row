import { memo, ReactNode } from "react";
import { chakra } from "@chakra-ui/react";
import { boardDimension, boardSize } from "./Board";

/**
 * TODO Reactor out the constant numbers used here later
 */

const Grid = () => {
  return (
    <chakra.svg
      position="absolute"
      viewBox="0 0 290 290"
      width={boardSize}
      height={boardSize}
      strokeWidth="1.25"
    >
      {(() => {
        const verticalLines: ReactNode[] = [];
        const horizontalLines: ReactNode[] = [];

        for (let i = 10; i < 290; i += 30) {
          verticalLines.push(
            <line key={i} x1={i} y1="10" x2={i} y2="280" stroke="black" />
          );
          horizontalLines.push(
            <line key={i} x1="10" y1={i} x2="280" y2={i} stroke="black" />
          );
        }
        return (
          <>
            {verticalLines}
            {horizontalLines}
          </>
        );
      })()}
    </chakra.svg>
  );
};

export default memo(Grid);
