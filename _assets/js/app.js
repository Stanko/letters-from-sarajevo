import Turbolinks from "turbolinks";
import run from "./run"

import "../sass/index.scss";

Turbolinks.start();

let isVhListenerSet = false;

function setVhUnit() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${ vh.toFixed(2) }px`);
  isVhListenerSet = true;
}

run(() => {
  if (!isVhListenerSet) {
    console.log('123')
    window.addEventListener('resize', setVhUnit);
  }
  setVhUnit();
});
