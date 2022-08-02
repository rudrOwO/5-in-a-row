import { useState } from "react";
import { ChakraProvider, Center, HStack, VStack } from "@chakra-ui/react";
import Stone from "./components/Stone";

const App = () => {
  return (
    <ChakraProvider>
      <Center w="100vw" h="100vh" bg="#dcb35c">
        <VStack spacing="0.875rem">
          <HStack spacing="0.875rem">
            <Stone color="white" /> &nbsp;&nbsp;
            <Stone color="black" />
          </HStack>
          <HStack spacing="0.875rem">
            <Stone color="white" /> &nbsp;&nbsp;
            <Stone color="black" />
          </HStack>
        </VStack>
      </Center>
    </ChakraProvider>
  );
};

export default App;
