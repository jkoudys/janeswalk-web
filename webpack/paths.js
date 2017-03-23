const { resolve } = require('path');

const theme = resolve('./themes/janeswalk/js');
const blockTemplates = resolve('./blocks/page_list/templates');

module.exports = {
  js: theme,
  js_lib: [
    `${theme}/app.js`,
    `${theme}/extend.js`,
    `${theme}/shims.js`,
    `${theme}/tiny-pubsub.js`,
  ],
  js_app: `${theme}/router.js`,
  js_blocks: [
    `${blockTemplates}/typeahead`,
    `${blockTemplates}/walk_filters`,
  ],
  js_views: [`${theme}/router.js`],
  jsx: [`${theme}/components/**/*.jsx`],
  languages: `./languages`,
  mos: [`./languages/*/*.mo`],
  less: [`./themes/janeswalk/css/main.less`],
  css: `./themes/janeswalk/css/`,
  react_views: `${theme}/components/`,
};
