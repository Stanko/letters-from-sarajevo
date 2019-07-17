import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
// import translations from '../../translations';

const links = [
  {
    route: routes.FIRST_LETTER,
    text: 1,
  },
  {
    route: routes.FIRST_RESPONSE,
    text: 2,
  },
];

interface IProps {
  route: string;
}

const renderLinks = (route: string) => {
  const activeIndex = links.findIndex(link => route === link.route);

  return links.map((link, index) => {
    let animation;

    if (activeIndex === -1 || activeIndex === index) {
      animation = 'fade';
    } else if (activeIndex > index) {
      animation = 'right';
    } else {
      animation = 'left';
    }

    return (
      <Link
        to={{
          pathname: link.route,
          state: { animation },
        }}
        key={ link.route }
      >
        { link.text }
      </Link>
    );
  });
}

const LettersNav: React.FC<IProps> = ({ route }) => {
  return (
    <nav>
      { renderLinks(route) }
    </nav>
  );
}

export default LettersNav;
