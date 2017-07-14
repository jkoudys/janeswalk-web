const { parse } = require('babylon');
const fsp = require('fs-promise');
const flatten = Array.prototype.concat.bind(Array.prototype);

const excludedFiles = [
  'view.js',
  'janeswalk.js',
  'janeswalk.min.js',
];

const getTranslateStrings = () => 1;

// Recursively get JS
async function getFiles(dir) {
  const files = await Promise.all((await fsp.readdir(dir)).map(async (file) => {
    const path = `${dir}/${file}`;
    const stat = await fsp.stat(path);
    if (stat.isDirectory()) return getFiles(path);
    if (excludedFiles.includes(file)) return null;
    if (!file.match(/.js$/)) return null;
    return path;
  }));

  // Flatten the return
  return flatten(...files.filter(v => v));
}

const findTags = (ob) => Object.values(ob).reduce((a, e) => {
  if (e && typeof e === 'object') {
    if (Array.isArray(e)) {
      return a.concat(
        ...e.filter((v) => v && v.type === 'TaggedTemplateExpression'),
        ...e.map(v => v && findTags(v))
      );
    }
    if (e.type === 'TaggedTemplateExpression') return a.concat(e);
    return a.concat(findTags(e)).filter(v => v);
  }
  return a;
}, []);

const uniqueTags = (tags) => Object
.keys(flatten(...tags)
  .reduce((a, e) => (a[e] = true, a), {})
).sort();

// Take a TaggedTemplateExpression and build a tagged `Hello, ${0}!` string
const insertTokens = ({ quasi: { quasis } }) => quasis
.map(({ value: { cooked } }) => cooked)
.reduce((a, e, i, { length }) => {
  if (i === length - 1) return a + e;
  return a + e + '${' + i + '}';
}, '');

(async () => {
  const fileSets = await Promise.all([
    getFiles('./themes/janeswalk/js'),
    getFiles('./blocks'),
  ]);

  // Flatten and get all the .js
  const asts = await Promise.all(flatten(...fileSets)
  .map(async (file) => {
    const ast = parse(await fsp.readFile(file, 'utf-8'), {
      sourceType: 'module',
      plugins: [
        'classProperties',
        'objectRestSpread',
      ],
    });

    return findTags(ast)
    .filter(({ tag: { name } }) => name === 't')
    .map(insertTokens);
  }));

  const uniquePo = uniqueTags(asts).map((tag) => {
    const escaped = JSON.stringify(tag);
    return `msgid ${escaped}\nmsgstr ${escaped}\n`;
  }).join('\n');

  console.log(uniquePo);
})();
