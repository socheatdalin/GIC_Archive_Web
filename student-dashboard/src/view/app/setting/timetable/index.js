import { Box } from '@chakra-ui/react';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Schedule from './schedule';

export default function Year() {
  const { url } = useRouteMatch();
  return (
    <Box>
      <Switch>
        <Route path={`${url}/list`} component={Schedule} />
        {/* <Redirect to={`${url}/schedule`} /> */}
      </Switch>
    </Box>
  );
}
