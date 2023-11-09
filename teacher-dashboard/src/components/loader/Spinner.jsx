import { Center, Spinner as ChakraSpinner } from "@chakra-ui/react";

export default function Spinner() {
  return (
    <Center pos="absolute" top="50%" right="50%" flex="1">
      <ChakraSpinner
        thickness="3px"
        speed="0.65s"
        emptyColor="gray.200"
        color="brand.500"
        size="lg"
      />
    </Center>
  );
}
