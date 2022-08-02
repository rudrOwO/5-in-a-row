import { useState } from "react";
import { ChakraProvider, Center, HStack, VStack } from "@chakra-ui/react";
import Board from "./components/Board";

const App = () => {
  return (
    <ChakraProvider>
      <Center w="100vw" h="100vh" bg="#dcb35c">
        <Board />
      </Center>
    </ChakraProvider>
  );
};

export default App;
