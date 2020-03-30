import '../sass/index.scss';

import MenuButton from './menu-button';
import HasTabbed from 'has-tabbed';


document.documentElement.className = '';
new HasTabbed('--show-focus');

const languageSwitcherButton = document.querySelector('[data-inclusive-menu-opens]')

if (languageSwitcherButton) {
  new MenuButton(languageSwitcherButton)
}


function setVhUnit() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${ vh.toFixed(2) }px`);
}

window.addEventListener('resize', setVhUnit);
setVhUnit();
