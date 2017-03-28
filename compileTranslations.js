const fsp = require('fs-promise');
const gettextParser = require('gettext-parser');

const excludedFiles = [];

// Convert old sprintf-format to ${0} tokens
const tokenFormat = (a, str, i, { length }) => a + str + ((i === length - 1) ? '' : `\${${i}}`);

// Recursively get mo and po
const getFiles = (dir) => fsp.readdir(dir)
.then((files) => Promise.all(files.map((file) => {
  const path = `${dir}/${file}`;
  return fsp.stat(path).then((stat) => {
    if (stat.isDirectory()) return getFiles(path);
    if (excludedFiles.includes(file)) return null;
    if (!file.match(/\.[mp]o$/)) return null;
    return { dir, file };
  });
})))
.then((files) => Array.prototype.concat(...files).filter(f => f));

getFiles('./languages')
.then((files) => Promise.all(files.map(({ dir, file }) => {
  return fsp.readFile(`${dir}/${file}`).then((contents) => ({ dir, file, contents }));
})))
.then((files) => files.reduce((a, { dir, file, contents }) => {
  const type = file.match(/\.mo$/) ? gettextParser.mo : gettextParser.po;
  const { translations } = type.parse(contents, 'utf-8');
  const flat = {};

  // Remove redundant ID, as that's the key already
  for (const group of Object.values(translations)) {
    for (const { msgid, msgstr, msgid_plural } of Object.values(group)) {
      const key = (msgid_plural ? `${msgid}_${msgid_plural}` : msgid)
      .split(/%[ds]/)
      .reduce(tokenFormat, '');

      const message = msgstr.join('').split(/%[ds]/).reduce(tokenFormat, '');

      if (message) flat[key] = message;
    }
  }

  return Object.assign(a, { [dir]: Object.assign({}, a[dir], flat) });
}, {}))
.then((dirs) => {
  for (const [dir, translations] of Object.entries(dirs)) {
    fsp.writeFile(`${dir}/messages.json`, JSON.stringify(translations, null, ' '), 'utf-8');
  }
})
.catch(console.error);
