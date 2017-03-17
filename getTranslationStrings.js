const { parse } = require('babylon');
const fsp = require('fs-promise');

// Recursively get JS
const getFiles = (dir) => fsp.readdir(dir)
.then((files) => Promise.all(files.map((file) => {
  const path = `${dir}/${file}`;
  return fsp.stat(path).then((stat) => stat.isDirectory() ? getFiles(path) : path);
})))
.then((files) => Array.prototype.concat(...files));

Promise.all([
//  getFiles('./themes/janeswalk/js'),
//  getFiles('./js'),
  getFiles('./blocks'),
]).then((fileSets) => {
  // Flatten and get all the .js
  return Promise.all(Array.prototype.concat(...fileSets)
  .filter((fn) => fn.match(/.js$/))
  .map((file) => fsp.readFile(file, 'utf-8')
    .then((script) => parse(script, { sourceType: 'module' }))
    .catch((err) => console.error(file, err))
  ));
})
.then((ast) => console.log(ast));
