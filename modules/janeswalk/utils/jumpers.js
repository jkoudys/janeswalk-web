import jump from 'jump.js';

export const jumpOptions = { duration: 400, offset: -150 };

/**
 * Grab the native element, find its Form.Item. Find the next Form.Item after
 * it, and jump down to it.
 */
export function jumpNext({ nativeEvent: { target } }) {
  const items = [...document.querySelectorAll('.ant-form-item')];
  const thisItem = target.closest('.ant-form-item');
  const nextItem = items[items.indexOf(thisItem) + 1];

  if (nextItem) {
    const input = nextItem.querySelector('.ant-input');
    // Scroll to it
    jump(nextItem, {
      ...jumpOptions,
      callback() {
        // If there's a text-input, put the caret in it. Otherwise, just focus it.
        if (input) {
          input.focus();
          input.select();
        }
      },
    });
  }
}

export function keyboard(ev) {
  const { keyCode, which, shiftKey } = ev.nativeEvent;
  const code = keyCode || which;

  // Bind enter and tab
  if (!shiftKey && code === 13 || code === 9) {
    jumpNext(ev);
    ev.preventDefault();
  }
}
