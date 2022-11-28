const i18n = require('i18n');
const { language } = App.middleware();
const messages = require('./reader/language');
const fs = require('fs');

module.exports = {
  register(){
    let directory = __dirname + '/locales';

    if (fs.existsSync(directory)) fs.rmdirSync(directory, {recursive: true});

    fs.mkdirSync(directory, 0744);

    // Save cache
    for (let lc in messages) {
      if (messages.hasOwnProperty(lc)) {
        fs.writeFile(directory + '/' + lc + '.json', JSON.stringify(messages[lc]), { flag: 'w'}, () => {});
      }
    }
    
    i18n.configure({
      // setup some locales - other locales default to en silently
      // locales: ['vi'],
      defaultLocale: 'vi',
      // where to store json files - defaults to './locales'
      directory,
      // messages,
      register: global
    });
  },
  boot({ app, name }) {
    app.use(i18n.init);
    app.use(language);
  }
};
