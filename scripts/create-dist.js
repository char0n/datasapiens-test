const Q = require('q');
const fs = require('fs');
const zipdir = require('zip-dir');
const path = require('path');
const packageJson = require(path.join(__dirname, '..', 'package.json'));
const git = require('git-rev');
const crypto = require('crypto');

const distPath = path.join(__dirname, '..', 'dist');
const distTmpName = path.join(distPath, 'dist.zip');
const sha1Hash = crypto.createHash('sha1');

const gitCommit = Q.async(function * () {
  return new Promise(resolve => {
    git.short(str => resolve(str));
  });
});

const gitBranch = Q.async(function * () {
  return new Promise(resolve => {
    git.branch(brancName => resolve(brancName));
  });
});

const createZip = Q.async(function * () {
  return new Promise(resolve => {
    zipdir(distPath, {saveTo: distTmpName}, (err, buffer) => {
      sha1Hash.update(buffer);
      resolve(distTmpName);
    });
  });
});

Q.spawn(function * () {
  const distTmpPath = yield createZip();
  const gitCommitHash = yield gitCommit();
  const gitBranchName = yield gitBranch();
  const sha1Short = sha1Hash.digest('hex').substr(0, 7);
  const distFileName = `${packageJson.name}-${packageJson.version}-build.${gitBranchName}-${gitCommitHash}-sha.${sha1Short}.zip`;
  const distNewPath = path.join(distPath, distFileName);

  fs.renameSync(distTmpPath, distNewPath);
  console.log(`Dist file created: dist/${distFileName}`);
});

