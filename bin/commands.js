const { projectName } = require('./args');
const { getCurrentWorkingDirectory } = require('./helpers');
const { MAIN_REPO, EXTENSION } = require('./urls');

module.exports = {
  CLONE_PROJECT: `cd ${getCurrentWorkingDirectory()} && git clone ${MAIN_REPO} ${projectName}`,
  CLONE_EXTENSION: `cd ${getCurrentWorkingDirectory()} && git clone ${EXTENSION} ${projectName}`,
  INSTALL_DEPENDENCIES: `cd ${projectName} && npm install --force`,
};
