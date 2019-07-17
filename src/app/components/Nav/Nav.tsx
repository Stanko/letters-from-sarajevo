import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import translations from '../../translations';

import './Nav.scss';

const Nav: React.FC = () => {
  return (
    <nav className='Nav'>
      <Link to='/'>{ translations.nav.home }</Link>
      <Link to={ routes.ABOUT }>{ translations.nav.about }</Link>
    </nav>
  );
}

export default Nav;
