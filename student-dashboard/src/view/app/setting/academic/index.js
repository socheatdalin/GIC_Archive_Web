import { Box } from '@chakra-ui/react';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import academic from './academic';

export default function Academic() {
  const { url } = useRouteMatch();
  return (
    <Box>
      <Switch>
        <Route path={`${url}/academic`} component={academic} />
        <Redirect to={`${url}/academic`} />
      </Switch>
    </Box>
  );
}
