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

Promise.all([
//  getFiles('./themes/janeswalk/js'),
//  getFiles('./js'),
  getFiles('./blocks'),
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
.then((ast) => console.log(JSON.stringify(ast)));
