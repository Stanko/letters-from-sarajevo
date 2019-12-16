import React from 'react';
import cx from 'classnames';

interface IProps {
  children: any;
  location: any;
  className: string;
}

const Page: React.FC<IProps> = ({ children, className, location }) => {
  const animation = location.state && location.state.animation;

  // console.log(location)

  const pageClasses = cx('Page', {
    [`Page--${ animation }`]: animation,
    [className]: className,
  });

  return (
    <main role='main' className={ pageClasses }>
      { children }
    </main>
  );
}

export default Page;
