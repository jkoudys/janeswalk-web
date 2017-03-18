const { parse } = require('babylon');
const fsp = require('fs-promise');

const excludedFiles = [
  'view.js',
  'janeswalk.js',
  'janeswalk.min.js',
];

const getTranslateStrings = () => 1;

// Recursively get JS
const getFiles = (dir) => fsp.readdir(dir)
.then((files) => Promise.all(files.map((file) => {
  const path = `${dir}/${file}`;
  return fsp.stat(path).then((stat) => {
    if (stat.isDirectory()) return getFiles(path);
    if (excludedFiles.includes(file)) return null;
    if (!file.match(/.js$/)) return null;
    return path;
  });
})))
.then((files) => Array.prototype.concat(...files));

const findTags = (ob) => Object.values(ob).reduce((a, e) => {
  if (e && typeof e === 'object') {
    if (Array.isArray(e)) {
      return a.concat(
        ...e.filter(({ type }) => type === 'TaggedTemplateExpression'),
        ...e.map(v => findTags(v))
      );
    }
    if (e.type === 'TaggedTemplateExpression') return a.concat(e);
    return a.concat(findTags(e));
  }
  return a;
}, []);

// Take a TaggedTemplateExpression and build a tagged `Hello, ${0}!` string
const insertTokens = ({ quasi: { quasis } }) => quasis
.map(({ value: { cooked } }) => cooked)
.reduce((a, e, i, { length }) => {
  if (i === length - 1) return a + e;
  return a + e + '${' + i + '}';
}, '');

Promise.all([
//  getFiles('./test'),
  getFiles('./themes/janeswalk/js'),
//  getFiles('./js'),
//  getFiles('./blocks'),
]).then((fileSets) => {
  // Flatten and get all the .js
  return Promise.all(Array.prototype.concat(...fileSets)
  .filter((v) => v)
  .map((file) => fsp.readFile(file, 'utf-8')
    .then((script) => parse(script, {
      sourceType: 'module',
      plugins: [
        'classProperties',
        'objectRestSpread',
      ],
    }))
    .catch((err) => console.error(file, err))
  ));
})
.then((asts) => asts.map((ast) => {
  return findTags(ast)
  .filter(({ tag: { name } }) => name === 't')
  .map(insertTokens);
}))
.then((tags) => console.log(Object.keys(Array.prototype.concat(...tags).reduce((a, e) => (a[e] = true, a), {})).sort()))
.catch((err) => console.log(err));
