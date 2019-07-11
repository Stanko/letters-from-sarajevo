// Tells us if app is running in the headless browser
// while being crawled by react-snap

const isReactSnap = navigator.userAgent.toLowerCase().search('reactsnap') >= 0;

export default isReactSnap;