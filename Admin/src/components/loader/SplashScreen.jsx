import { Center, Image } from '@chakra-ui/react';
import React from 'react';
import image from '../asssets';

export default function SplashScreen() {
  return (
    <Center h="100vh" w="100vw" pos="relative">
      <Image w="200px" pos="sticky" src={image.logo} />
    </Center>
  );
}
