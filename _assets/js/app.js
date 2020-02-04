import Turbolinks from "turbolinks";
import run from "./run"

import "../sass/index.scss";

Turbolinks.start();

run(() => {
  console.log('Hello', window.location.pathname);
});
