var fs = require('fs');

installGitHooks();

function installGitHooks() {
  directoryExists('./.git/hooks')
    .then(function() {
      console.info('Installing git commit hooks...');
      fs.createReadStream('./validate-commit-msg.js').pipe(fs.createWriteStream('./.git/hooks/commit-msg', {mode: '777'}));
    })
    .catch(function() {
      console.warn('Unable to install git commit hooks!');
    });
}

function directoryExists(path) {
  return new Promise(function(resolve, reject) {
    fs.stat(path, function (error, stats) {
      if (error === null && stats.isDirectory()) {
        resolve();
      } else {
        reject();
      }
    });
  });
}
