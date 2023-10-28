import { Box, Flex } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

import SplashScreen from '../../components/loader/SplashScreen';

const DelayImport = (path) => {
  return React.lazy(() => {
    return Promise.all([
      path,
      new Promise((resolve) => setTimeout(resolve, 300)),
    ]).then(([moduleExports]) => moduleExports);
  });
};


const Thesis = DelayImport(import('./setting/thesis'));
const Project = DelayImport(import('./setting/project'));
const Dashboard = DelayImport(import('./setting/dashboard'));
const Profile = DelayImport(import('./setting/profile'));
const routeItem = [

  {
    path: '/home/thesis',
    element: <Thesis />,
  },
  {
    path: '/home/project',
    element: <Project />,
  },
  {
    path: '/home/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/home/profile',
    element: <Profile />,
  }
];

const MotionBox = motion(Box);

export default function App() {
  const location = useLocation();

  return (
    <Suspense fallback={<SplashScreen />}>
      <Flex position="relative" h="100vh" overflow="auto">
        <Box display="flex">
          <Sidebar />
        </Box>
        <Box
          w={'calc(100% - 18rem)'}
          p="10"
          bgColor="#f0f5f8"
          position="relative"
          flex="1"
        >
          <AnimatePresence mode="wait">
            <Switch location={location} key={location.pathname}>
              {routeItem.map(({ path, element }) => (
                <Route key={path} path={path}>
                  <MotionBox
                    h="full"
                    overflow="auto"
                    rounded="md"
                    key={location.pathname}
                    initial={{
                      y: -10,
                      opacity: 0,
                      transition: { duration: 0.15 },
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.2 },
                    }}
                    exit={{
                      y: -20,
                      opacity: 0,
                      transition: { duration: 0.15 },
                    }}
                  >
                    {element}
                  </MotionBox>
                </Route>
              ))}
            </Switch>
          </AnimatePresence>
        </Box>
      </Flex>
    </Suspense>
  );
}
