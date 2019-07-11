import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import routes from '../../constants/routes';

import Nav from '../../components/Nav/Nav';

import store from '../../store';

import Home from '../Home/Home';
import About from '../About/About';
import NotFound from '../NotFound/NotFound';


const App: React.FC = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Nav />

        <Switch>
          <Route exact path='/' component={ Home } />
          <Route exact path={ routes.ABOUT } component={ About } />
          <Route path='*' component={ NotFound } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default hot(module)(App);

