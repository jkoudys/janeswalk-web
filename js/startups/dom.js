/**
 * DOM startup loader
 * A promise that your DOM will load
 */

export default new Promise(res => {
  if (document.readyState === 'interactive') res(document);
  else document.addEventListener('DOMContentLoaded', () => res(document));
});
