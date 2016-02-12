/**
 * Utils for when we need direct DOM access, e.g. calculating actual size of components
 */

/**
 * Make the navbar sticky to the top
 */
export function makeSticky(reference, el) {
  let running = false;
  // Where the el is when unfixed
  let unfixed = reference.offsetTop;
  const stick = () => {
    if (running) return;
    running = true;
    requestAnimationFrame(() => {
      running = false;
      // TODO: remove this 60 hardcoding of the header height
      if (window.scrollY > unfixed - 60) {
        el.classList.add('fixed');
      } else {
        el.classList.remove('fixed');
      }
    });
  };
  window.addEventListener('scroll', stick);
  window.addEventListener('resize', () => {unfixed = reference.offsetTop; stick()});
}
