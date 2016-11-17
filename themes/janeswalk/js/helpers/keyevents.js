const buttonActions = {
  M: () => {
    const toolbar = document.getElementById('ccm-toolbar');
    if (toolbar && (toolbar.style.display === 'block' || !toolbar.style.display)) {
      toolbar.style.display = 'none';
      return;
    }
    toolbar.style.display = 'block';
    return;
  },
};

/**
 * Let hitting 'm' make the menu pop up
 */
export default function initKeyEvents() {
  // Init keyboard shortcuts
  if (toolbar) {
    window.addEventListener('keyup', ({ key, keyCode, target: { tagName } }) => {
      const keyPressed = String(key || (keyCode && String.fromCharCode(keyCode))).toUpperCase();
      /* Don't capture inputs going into a form */
      if (tagName !== 'INPUT' && keyPressed in buttonActions) {
        buttonActions[keyPressed]();
      }
    });
  }
}
