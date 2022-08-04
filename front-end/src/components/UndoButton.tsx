import { Dispatch, SetStateAction, useCallback, memo } from "react";
import { Button, Text } from "@chakra-ui/react";
import { AiOutlineUndo } from "react-icons/ai";
import { StoneIndicator } from "./Board";

interface UndoButtonProps {
  history: { x: number; y: number }[];
  setBoard: Dispatch<SetStateAction<StoneIndicator[][]>>;
}

const UndoButton = (props: UndoButtonProps) => {
  const { history, setBoard } = props;

  const handleClick = useCallback(() => {
    const toBeRemoved = history.splice(-2);

    setBoard(prevBoard => {
      const mutatedBoard = [...prevBoard];
      for (let { x, y } of toBeRemoved) {
        mutatedBoard[y][x] = StoneIndicator.EMPTY;
      }
      return mutatedBoard;
    });
  }, []);

  return (
    <Button
      bg="#1A1A1A"
      colorScheme="blackAlpha"
      borderRadius="md"
      size="lg"
      mx="0.875rem"
      _hover={{
        background: "#1A1A1A",
      }}
      leftIcon={<AiOutlineUndo fontSize="25px" color="#eeeeee" />}
      iconSpacing="1px"
      onClick={handleClick}
    >
      <Text fontSize="lg" ml="15px" mt="5px" color="#eeeeee">
        Undo
      </Text>
    </Button>
  );
};

export default memo(UndoButton);
