import List from './List';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
// import AddEdit from './AddEdit';

export default function Student() {
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
