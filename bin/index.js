#!/usr/bin/env node

const child_process = require('child_process');
const util = require('util');
const fs = require('fs');
const chalk = require('chalk');

const loading = require('loading-cli');

const folderName = process.argv[2] || 'Best-Coding-Practices-Boilerplate';

const executeCommand = util.promisify(child_process.exec);

const updatePackageJson = () => {
  // * update name inside package.json
  const packageJsonContent = fs.readFileSync(
    `${folderName}/package.json`,
    'utf8',
  );

  const newPackageJsonContent = packageJsonContent.replace(
    /xord-app/g,
    folderName,
  );

  fs.writeFileSync(`${folderName}/package.json`, newPackageJsonContent, err =>
    console.error(err),
  );
};

(async () => {
  try {
    console.log(chalk.bgGreen(`creating xord react app in ${folderName}`));

    // * clone the repo
    await executeCommand(
      `cd ${process.cwd()} && git clone https://github.com/XORD-one/Best-Coding-Practices-Boilerplate.git ${folderName}`,
    );

    // * update package.json
    updatePackageJson();

    // * install dependencies
    // ? -- run loader
    const load = loading('Installing Dependencies').start();
    load.color = 'yellow';

    await executeCommand(`cd ${folderName} && npm install`);

    // ? -- stop loader
    load.stop();

    console.log(chalk.yellow(`dependencies installed successfully!`));
    console.log(chalk.bgGreen(`project created, enjoy!`));
  } catch (error) {
    console.error(error);
    if (error.stderr) {
      if (
        String(error.stderr || '')?.includes(
          'already exists and is not an empty directory.',
        )
      ) {
        console.log(
          chalk.red(
            `Folder ${folderName} already exists, try deleting the folder or renaming your project.`,
          ),
        );
      } else if (String(error.stderr).includes('npm ERR')) {
        console.log(
          chalk.red(
            `Error occurred while installing dependencies. Please check package.json file inside ${folderName} folder.`,
          ),
        );
      }
    }
  }
})();
