const chalk = require('chalk');
const { projectName } = require('./args');

module.exports = {
  INITIAL: chalk.bgGreen(`creating xord react app in ${projectName}`),
  SUCCESSFUL_DEPENDENCY_INSTALL: chalk.yellow(
    `dependencies installed successfully!`,
  ),
  SUCCESSFUL_PROJECT_CREATE: chalk.bgGreen(`project created, enjoy!`),
  ERROR_ALREADY_EXISTS: chalk.red(
    `Folder ${projectName} already exists, try deleting the folder or renaming your project.`,
  ),
  ERROR_DEPENDENCY_INSTALL: chalk.red(
    `Error occurred while installing dependencies. Please check package.json file inside ${projectName} folder.`,
  ),
  ERROR_GENERAL: chalk.red(`An error occurred while creating project.`),
};
