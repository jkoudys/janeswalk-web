import { render } from 'react-dom';

export function printElement(reactElement) {
  const win = window.open();
  const el = win.document.createElement('div');
  render(reactElement, el);
  window.focus();
  win.document.body.appendChild(el);
  win.print();
  win.close();
}
