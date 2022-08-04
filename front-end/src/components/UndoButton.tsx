import { Dispatch, SetStateAction } from "react";
import { Button, Text } from "@chakra-ui/react";
import { AiOutlineUndo } from "react-icons/ai";
import { StoneIndicator } from "./Board";

interface UndoButtonProps {
  setHistory: Dispatch<SetStateAction<{ x: number; y: number }[] | null>>;
  setBoard: Dispatch<SetStateAction<StoneIndicator[][]>>;
}

const UndoButton = (props: UndoButtonProps) => {
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
      leftIcon={<AiOutlineUndo fontSize="30px" color="#eeeeee" />}
      iconSpacing="3px"

      //   onClick={handleClick}
    >
      <Text fontSize="xl" ml="15px" mt="5px" color="#eeeeee">
        Undo
      </Text>
    </Button>
  );
};

export default UndoButton;
