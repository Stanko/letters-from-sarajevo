export const routeKeys = {
  ABOUT: 'ABOUT',
  FIRST_LETTER: 'FIRST_LETTER',
  FIRST_RESPONSE: 'FIRST_RESPONSE',
}

export const en = {
  [routeKeys.ABOUT]: '/about',
  [routeKeys.FIRST_LETTER]: '/first-letter',
  [routeKeys.FIRST_RESPONSE]: '/first-response',
};

export const rs = {
  [routeKeys.ABOUT]: '/o-knjizi',
  [routeKeys.FIRST_LETTER]: '/prvo-pismo',
  [routeKeys.FIRST_RESPONSE]: '/prvi-odgovor',
};

export const routeTransitionOrder = [
  routeKeys.FIRST_LETTER,
  routeKeys.FIRST_RESPONSE,
];


export const routeTransitions = {
  FADE: 'FADE',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
}

export function getRouteKey(route:string) {
  for (let [key, value] of Object.entries(en)) {
    if (value === route) {
      return key;
    }
  }

  return null;
}

export function getRouteTransitionDirection(prevRoute:string, nextRoute:string):string {
  const prevRouteKey = getRouteKey(prevRoute);
  const prevRouteOrderIndex = routeTransitionOrder.findIndex(item => prevRouteKey === item);
  const nextRouteKey = getRouteKey(nextRoute);
  const nextRouteOrderIndex = routeTransitionOrder.findIndex(item => nextRouteKey === item);

  if (prevRouteOrderIndex > -1 && nextRouteOrderIndex > -1) {
    return prevRouteOrderIndex < nextRouteOrderIndex ?
      routeTransitions.LEFT :
      routeTransitions.RIGHT;
  }

  return routeTransitions.FADE;
}

console.log(getRouteTransitionDirection('/first-letter', '/first-response'));
console.log(getRouteTransitionDirection('/bla', '/bla'));
console.log(getRouteTransitionDirection('/first-response', '/first-letter'));

export default en;
