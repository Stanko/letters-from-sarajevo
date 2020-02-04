export default function run(fn) {
  window.addEventListener("DOMContentLoaded", () => {
    fn();

    document.addEventListener("turbolinks:load", function() {
      fn();
    });
  });
}

