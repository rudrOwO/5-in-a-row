import { Box } from "@chakra-ui/react";
import { boardSize } from "./Board";

const BoardLock = () => (
  <Box
    position="fixed"
    zIndex={10}
    width="100vw"
    height="100vh"
    _hover={{
      cursor: "wait",
    }}
  ></Box>
);

export default BoardLock;
