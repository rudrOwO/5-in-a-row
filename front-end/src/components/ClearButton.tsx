import { Dispatch, SetStateAction, useCallback, memo } from "react";
import { Button, Text } from "@chakra-ui/react";
import { AiOutlineClear } from "react-icons/ai";
import { StoneIndicator } from "./Board";

interface ClearButtonProps {
  setBoard: Dispatch<SetStateAction<StoneIndicator[][]>>;
}

const ClearButton = (props: ClearButtonProps) => {
  const { setBoard } = props;
  const handleClick = useCallback(() => {
    setBoard(prevBoard =>
      prevBoard.map(boardRow =>
        boardRow.map(stoneIndicator => StoneIndicator.EMPTY)
      )
    );
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
