import '../sass/index.scss';

import MenuButton from './menu-button';
import HasTabbed from 'has-tabbed';


document.documentElement.className = '';
const tabbed = new HasTabbed('--show-focus');

// get a menu button
const exampleButton = document.querySelector('[data-inclusive-menu-opens]')

// Make it a menu button
const exampleMenuButton = new MenuButton(exampleButton)


function setVhUnit() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${ vh.toFixed(2) }px`);
}

window.addEventListener('resize', setVhUnit);
setVhUnit();
