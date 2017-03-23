module.exports = {
  js: './themes/janeswalk/js',
  js_lib: [
    './themes/janeswalk/js/app.js',
    './themes/janeswalk/js/extend.js',
    './themes/janeswalk/js/shims.js',
    './themes/janeswalk/js/tiny-pubsub.js',
  ],
  js_app: './themes/janeswalk/js/router.js',
  js_blocks: [
    './blocks/page_list/templates/typeahead',
    './blocks/page_list/templates/walk_filters',
  ],
  js_views: ['./themes/janeswalk/js/router.js'],
  jsx: ['./themes/janeswalk/js/components/**/*.jsx'],
  languages: './languages',
  mos: ['./languages/*/*.mo'],
  less: ['./themes/janeswalk/css/main.less'],
  css: './themes/janeswalk/css/',
  react_views: './themes/janeswalk/js/components/',
};
