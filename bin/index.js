#!/usr/bin/env node

const {
  updateProjectNames,
  executeCommand,
  getDependencyLoader,
} = require('./helpers');
const {
  INITIAL,
  SUCCESSFUL_DEPENDENCY_INSTALL,
  SUCCESSFUL_PROJECT_CREATE,
  ERROR_ALREADY_EXISTS,
  ERROR_DEPENDENCY_INSTALL,
  ERROR_GENERAL,
} = require('./messages');
const {
  CLONE_PROJECT,
  INSTALL_DEPENDENCIES,
  CLONE_EXTENSION,
} = require('./commands');
const { template } = require('./args');

let installDependenciesLoader;

(async () => {
  try {
    console.log(INITIAL);

    // * clone the repo
    await executeCommand(
      template === 'extension' ? CLONE_EXTENSION : CLONE_PROJECT,
    );

    // * update package.json
    updateProjectNames();

    // * install dependencies
    // ? -- run loader
    installDependenciesLoader = getDependencyLoader();

    await executeCommand(INSTALL_DEPENDENCIES);

    // ? -- stop loader
    installDependenciesLoader?.stop();

    console.log(SUCCESSFUL_DEPENDENCY_INSTALL);
    console.log(SUCCESSFUL_PROJECT_CREATE);
  } catch (error) {
    installDependenciesLoader?.stop();
    if (
      String(error.stderr || '').includes(
        'already exists and is not an empty directory.',
      )
    ) {
      console.log(ERROR_ALREADY_EXISTS);
    } else if (String(error.stderr || '').includes('npm ERR')) {
      console.log(ERROR_DEPENDENCY_INSTALL);
    } else {
      console.error(error);
      console.log(ERROR_GENERAL);
    }
  }
})();
