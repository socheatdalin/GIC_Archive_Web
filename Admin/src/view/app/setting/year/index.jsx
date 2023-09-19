import { Box } from '@chakra-ui/react';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import List from './List';


export default function Year() {
  const { url } = useRouteMatch();
  return (
    <Box>
      <Switch>
        <Route path={`${url}/list`} component={List} />
        <Redirect to={`${url}/list`} />
      </Switch>
    </Box>
  );
}
