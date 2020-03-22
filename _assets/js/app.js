import "../sass/index.scss";

let isVhListenerSet = false;

function setVhUnit() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${ vh.toFixed(2) }px`);
  isVhListenerSet = true;
}

window.addEventListener('resize', setVhUnit);
setVhUnit();
