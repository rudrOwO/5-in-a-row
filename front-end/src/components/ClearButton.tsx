import { Dispatch, SetStateAction, useCallback } from "react";
import { Button, Text } from "@chakra-ui/react";
import { AiOutlineClear } from "react-icons/ai";

interface ClearButtonProps {
  setBoard: Dispatch<SetStateAction<("w" | "b" | "")[][]>>;
}

const ClearButton = (props: ClearButtonProps) => {
  const { setBoard } = props;
  const handleClick = useCallback(() => {
    setBoard(prevBoard =>
      prevBoard.map(boardRow => boardRow.map(stoneIndicator => ""))
    );
  }, []);

  return (
    <Button
      bg="#1A1A1A"
      colorScheme="blackAlpha"
      borderRadius="xl"
      size="lg"
      mb="5%"
      _hover={{
        background: "#1A1A1A",
      }}
      leftIcon={<AiOutlineClear fontSize="30px" color="#eeeeee" />}
      iconSpacing="3px"
      onClick={handleClick}
    >
      <Text fontSize="xl" ml="15px" mt="5px" color="#eeeeee">
        Clear All
      </Text>
    </Button>
  );
};

export default ClearButton;
