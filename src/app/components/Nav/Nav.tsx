import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import routes from '../../constants/routes';
import translations from '../../translations';

const Nav: React.FC = () => {
  return (
    <nav>
      <Link to='/'>{ translations.nav.home }</Link>
      <Link to={ routes.ABOUT }>{ translations.nav.about }</Link>
    </nav>
  );
}

export default Nav;
