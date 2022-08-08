import { Box, Text } from "@chakra-ui/react";

interface BoardLockProps {
  message: string;
}

const BoardLock = ({ message }: BoardLockProps) => (
  <>
    <Text color="#CD3132" fontSize="2xl" width="full" textAlign="center" mt="5%">
      {message}
    </Text>
    <Box
      position="fixed"
      zIndex={5}
      width="100vw"
      height="100vh"
      _hover={{
        cursor: "not-allowed",
      }}
    ></Box>
  </>
);

export default BoardLock;
