import React from 'react';
import translations from '../../translations';

import Page from '../../components/Page/Page';

import './FirstLetter.scss';

const lang = 'en';

const image1 = require(`../../../assets/${ lang }/letters/01/01.png`);
const image2 = require(`../../../assets/${ lang }/letters/01/02.png`);
const image3 = require(`../../../assets/${ lang }/letters/01/03.png`);
const image4 = require(`../../../assets/${ lang }/letters/01/04.png`);

const {
  title,
  tooltip,
  imageCaption1,
  imageCaption2,
  imageCaption3,
  imageCaption4,
} = translations.firstLetter;

const FirstLetter: React.FC = (props: any) => {
  return (
    <Page { ...props } className='FirstLetter'>
      <p className='FirstLetter-title'>
        { title }
        <span className='FirstLetter-tooltip'>{ tooltip }</span>
      </p>
      <div className='FirstLetter-images'>
        <div className='FirstLetter-image FirstLetter-image--one'>
          { imageCaption1 }
          <img src={ image1 } alt='TODO' />
        </div>
        <div className='FirstLetter-image FirstLetter-image--two'>
          { imageCaption2 }
          <img src={ image2 } alt='TODO' />
        </div>
        <div className='FirstLetter-image FirstLetter-image--three'>
          { imageCaption3 }
          <img src={ image3 } alt='TODO' />
        </div>
        <div className='FirstLetter-image FirstLetter-image--four'>
          { imageCaption4 }
          <img src={ image4 } alt='TODO' />
        </div>
      </div>
    </Page>
  );
}

export default FirstLetter;
