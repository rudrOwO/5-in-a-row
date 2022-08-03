import { ChakraProvider, Center } from "@chakra-ui/react";
import Board from "./components/Board";

const App = () => {
  return (
    <ChakraProvider>
      <Center
        w="100vw"
        h="100vh"
        bgGradient="linear-gradient(#c79081, #dfa579)"
      >
        <Board />
      </Center>
    </ChakraProvider>
  );
};

export default App;
