import { useState } from "react";
import { ChakraProvider, Center } from "@chakra-ui/react";

const App = () => {
  return (
    <ChakraProvider>
      <Center w="100vw" h="100vh" bgGradient="linear(blue.300, gray.100)">
        Hello World
      </Center>
    </ChakraProvider>
  );
};

export default App;
