import React from 'react';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box bg="red" py={4} px={6}>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        maxW="container.xl"
        mx="auto"
      >
        <Text color="white" fontSize="xl" fontWeight="bold">
          My Website
        </Text>

        <Flex display={['none', 'none', 'flex']} alignItems="center">
          <Text color="white" mr={4}>
            Home
          </Text>
          <Text color="white" mr={4}>
            About
          </Text>
          <Text color="white" mr={4}>
            Services
          </Text>
          <Text color="white" mr={4}>
            Contact
          </Text>
        </Flex>

        <Flex display={['flex', 'flex', 'none']}>
          <Button
            variant="ghost"
            color="white"
            onClick={handleToggle}
            _hover={{ bg: 'transparent' }}
            _focus={{ boxShadow: 'none' }}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </Button>
        </Flex>

        {isOpen && (
          <Box
            mt={4}
            bg="gray.800"
            borderRadius="md"
            py={2}
            display={['block', 'block', 'none']}
          >
            <Text color="white" px={4} py={2}>
              Home
            </Text>
            <Text color="white" px={4} py={2}>
              About
            </Text>
            <Text color="white" px={4} py={2}>
              Services
            </Text>
            <Text color="white" px={4} py={2}>
              Contact
            </Text>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;