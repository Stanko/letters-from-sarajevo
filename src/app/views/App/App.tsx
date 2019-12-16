import React, { Fragment, Component } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes, { getRouteTransitionDirection } from '../../constants/routes';

import Nav from '../../components/Nav/Nav';
import LettersNav from '../../components/LettersNav/LettersNav';

import store from '../../store';

import Home from '../Home/Home';
import About from '../About/About';
import NotFound from '../NotFound/NotFound';

import FirstLetter from '../Letters/FirstLetter';

import FirstResponse from '../Responses/FirstResponse';
import { render } from 'react-dom';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path={routes.ABOUT} component={About} />
      <Route exact path={routes.FIRST_LETTER} component={FirstLetter} />
      <Route exact path={routes.FIRST_RESPONSE} component={FirstResponse} />

      <Route path='*' component={NotFound} />
    </Switch>
  );
}

class Application extends Component<any, {}> {
  getSnapshotBeforeUpdate(prevProps:any) {


    return null;
  }

  componentDidUpdate(prevProps:any, prevState:any, prevChildren:any) {
    const {
      location: {
        pathname,
      },
    } = this.props;

    if (pathname !== prevProps.location.pathname) {
      return getRouteTransitionDirection(prevProps.location.pathname, pathname);
    }
  }

  render() {
    const {
      location,
      location: {
        pathname,
        state,
      },
    } = this.props;

    return (
      <Fragment>
        <Nav />
        <Routes />
        <LettersNav route={pathname} />
      </Fragment>
    )
  };
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route
          component={Application}
        />
      </BrowserRouter>
    </Provider>
  );
}

export default hot(module)(App);

