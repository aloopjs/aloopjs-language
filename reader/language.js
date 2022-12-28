const fs = require('fs');
const path = require('path');
const basename = path.dirname(require.main.filename);
let handlers = {};
const {modules} = App.options;

function addHandlers(dir, file){
  let configData = require(path.join(dir, file));
  let name = path.parse(file).name;
  handlers[name] = {
    ...(handlers[name] || {}),
    ...configData
  };
}

modules.forEach((el) => {
  let root = null;

  // Check if have not start @
  if (el.charAt(0) !== '@') root = [basename, 'src', el, 'locales'].join(path.sep);
  else root = [basename, 'node_modules', el.replace(/^@/, ''), 'locales'].join(path.sep);

  if (fs.existsSync(root)) {
    fs
    .readdirSync(root)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file.slice(-5) === '.json');
    })
    .forEach(file => {
      addHandlers(root, file);
    });
  }
});

module.exports = handlers;
