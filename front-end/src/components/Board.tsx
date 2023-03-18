import { Box, Flex, SimpleGrid } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import Stone, { stoneSize } from "./Stone"
import LineGrid from "./LineGrid"
import BoardLock from "./BoardLock"
import UndoButton from "./UndoButton"
import ClearButton from "./ClearButton"

export const boardSize = `${(10 + (10 - 1) / 2) * stoneSize}rem`
const stoneSpacing = `${stoneSize / 2}rem`
export enum StoneIndicator {
  EMPTY,
  WHITE,
  BLACK,
}

const Board = () => {
  const [board, setBoard] = useState<StoneIndicator[]>(() => {
    const filler = new Array<StoneIndicator>(10 * 10)

    for (let i = 0; i < 10 * 10; ++i) {
      filler[i] = StoneIndicator.EMPTY
    }
    return filler
  })
  const [isFetching, setIsFetching] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const history = useRef<number[]>([])

  useEffect(() => {
    if (isFetching) {
      const fetchAIMove = async () => {
        const response = await fetch("http://localhost:5000/ai", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            grid: board,
          }),
        })

        const { AIMove, isGameOver } = await response.json()

        history.current.push(AIMove)

        setBoard((prevBoard) => {
          const mutatedBoard = [...prevBoard]
          mutatedBoard[AIMove] = StoneIndicator.WHITE
          return mutatedBoard
        })

        setIsFetching(false)
        setIsGameOver(isGameOver)
      }

      fetchAIMove()
    }
  }, [isFetching])

  return (
    <Box>
      <Flex justifyContent="space-between" mb="5%">
        <UndoButton
          disabled={isFetching && !isGameOver}
          history={history.current}
          setBoard={setBoard}
          setIsGameOver={setIsGameOver}
        />
        <ClearButton
          disabled={isFetching && !isGameOver}
          history={history.current}
          setBoard={setBoard}
          setIsGameOver={setIsGameOver}
        />
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
            stoneIndicator={
              stoneIndicator === StoneIndicator.WHITE
                ? StoneIndicator.WHITE
                : StoneIndicator.BLACK
            }
            position={i}
            key={i}
            opacity={stoneIndicator === StoneIndicator.EMPTY ? 0 : 1}
            setBoard={setBoard}
            history={history.current}
            setIsFetching={setIsFetching}
          />
        ))}
      </SimpleGrid>
      <Flex h="3vh" alignItems="center">
        {isFetching && <BoardLock message="Calculating ..." />}
        {isGameOver && <BoardLock message="Game Over!" />}
      </Flex>
    </Box>
  )
}

export default Board
