import React from 'react';
import translations from '../../translations';
import Page from '../../components/Page/Page';

const {
  date,
  text,
} = translations.firstResponse;

const renderText = () => {
  return text.map(p => {
    return (
      <p key={ p }>{ p }</p>
    );
  });
}

const FirstResponse: React.FC = (props: any) => {
  return (
    <Page { ...props } className='FirstLetter'>
      <p>{ date }</p>
      { renderText() }
    </Page>
  );
}

export default FirstResponse;
