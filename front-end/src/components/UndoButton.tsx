import { Dispatch, SetStateAction, useCallback, memo } from "react";
import { Button, Text, Box, useToast } from "@chakra-ui/react";
import { AiOutlineUndo } from "react-icons/ai";
import { StoneIndicator } from "./Board";

export interface UndoButtonProps {
  disabled?: boolean;
  history: number[];
  setIsGameOver: Dispatch<SetStateAction<boolean>>;
  setBoard: Dispatch<SetStateAction<StoneIndicator[]>>;
}

const UndoButton = (props: UndoButtonProps) => {
  const { history, setBoard, disabled = false, setIsGameOver } = props;
  const undoToast = useToast();

  const handleClick = useCallback(() => {
    const toBeRemoved = history.splice(-2);

    setBoard(prevBoard => {
      const mutatedBoard = [...prevBoard];
      for (let position of toBeRemoved) {
        mutatedBoard[position] = StoneIndicator.EMPTY;
      }
      return mutatedBoard;
    });

    if (toBeRemoved.length > 1) {
      undoToast({
        position: "bottom-right",
        render: () => (
          <Box color="#EEEEEE" p={2} bg="#141414" borderRadius="md">
            Rolled back 2 moves
          </Box>
        ),
      });
    }

    setIsGameOver(false);
  }, []);

  return (
    <Button
      disabled={disabled}
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
