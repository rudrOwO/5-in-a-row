import { useCallback, memo } from "react";
import { Button, Text, Box, useToast } from "@chakra-ui/react";
import { AiOutlineClear } from "react-icons/ai";
import { StoneIndicator } from "./Board";
import { UndoButtonProps } from "./UndoButton";

const ClearButton = (props: UndoButtonProps) => {
  const { history, setBoard, disabled = false, setIsGameOver } = props;
  const clearToast = useToast();

  const handleClick = useCallback(() => {
    setBoard(prevBoard => prevBoard.map(stoneIndicator => StoneIndicator.EMPTY));

    history.splice(0, history.length);

    clearToast({
      position: "bottom-right",
      render: () => (
        <Box color="#EEEEEE" p={2} bg="#141414" borderRadius="md">
          Board cleared
        </Box>
      ),
    });

    setIsGameOver(false);
  }, []);

  return (
    <Button
      zIndex={10}
      disabled={disabled}
      bg="#1A1A1A"
      colorScheme="blackAlpha"
      borderRadius="md"
      size="lg"
      mx="0.875rem"
      _hover={{
        background: "#1A1A1A",
      }}
      leftIcon={<AiOutlineClear fontSize="25px" color="#EEEEEE" />}
      iconSpacing="3px"
      onClick={handleClick}
    >
      <Text fontSize="lg" ml="15px" mt="5px" color="#EEEEEE">
        Clear
      </Text>
    </Button>
  );
};

export default memo(ClearButton);
