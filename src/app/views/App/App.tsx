import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import routes from '../../constants/routes';

import Nav from '../../components/Nav/Nav';
import LettersNav from '../../components/LettersNav/LettersNav';

import store from '../../store';

import Home from '../Home/Home';
import About from '../About/About';
import NotFound from '../NotFound/NotFound';

import FirstLetter from '../Letters/FirstLetter';

import FirstResponse from '../Responses/FirstResponse';

const renderMain = () => {
  return (
    <Switch>
      <Route exact path='/' component={ Home } />
      <Route exact path={ routes.ABOUT } component={ About } />
      <Route exact path={ routes.FIRST_LETTER } component={ FirstLetter } />
      <Route exact path={ routes.FIRST_RESPONSE } component={ FirstResponse } />

      <Route path='*' component={ NotFound } />
    </Switch>
  );
}

const renderApp = (props: any) => {
  const {
    location,
    location: {
      pathname,
      state,
    },
  } = props;

  return (
    <Fragment>
      <Nav />

      <TransitionGroup>
        <CSSTransition
          key={ pathname }
          classNames='Page'
          timeout={{
            enter: 10000,
            exit: 10000,
          }}
        >
          <Route
            location={location}
            render={ renderMain }
          />
        </CSSTransition>
      </TransitionGroup>
      <LettersNav route={ pathname } />
    </Fragment>
  )
};

const App: React.FC = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Route
          render={ renderApp }
        />
      </BrowserRouter>
    </Provider>
  );
}

export default hot(module)(App);

