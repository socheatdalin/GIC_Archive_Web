import React from 'react';
import App from './view/app';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
      <Route path="/home" component={App} />

      <Redirect to={'/home'} /> <App />
      </Switch>
    </BrowserRouter>
  );
}
