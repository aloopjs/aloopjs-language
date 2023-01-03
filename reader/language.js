const fs = require('fs');
const path = require('path');
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
  let root = App.base.modulePath(el, 'locales');

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
