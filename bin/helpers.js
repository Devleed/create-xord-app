const { projectName, template } = require('./args');
const fs = require('fs');
const util = require('util');
const { exec } = require('child_process');
const loading = require('loading-cli');

const exportObj = {
  getFileContent: filePath => fs.readFileSync(filePath, 'utf8'),
  writeFileContent: (filePath, content) =>
    fs.writeFileSync(filePath, content, err => console.error(err)),
  updateProjectNames: function () {
    if (template === 'extension') {
      const manifestPath = `${projectName}/public/manifest.json`;

      // * update manifest.json
      const manifestJsonContent = exportObj.getFileContent(manifestPath);

      const newManifestJsonContent = manifestJsonContent.replace(
        /xord-extension/g,
        projectName.toLowerCase(),
      );

      exportObj.writeFileContent(manifestPath, newManifestJsonContent);
    }
    const packageJsonPath = `${projectName}/package.json`;

    // * update name inside package.json
    const packageJsonContent = exportObj.getFileContent(packageJsonPath);

    const newPackageJsonContent = packageJsonContent.replace(
      /xord-app/g,
      projectName.toLowerCase(),
    );

    exportObj.writeFileContent(packageJsonPath, newPackageJsonContent);
  },
  executeCommand: util.promisify(exec),
  getCurrentWorkingDirectory: () => process.cwd(),
  getDependencyLoader: () => {
    const installDependenciesLoader = loading(
      'Installing Dependencies',
    ).start();
    installDependenciesLoader.color = 'yellow';

    return installDependenciesLoader;
  },
};

module.exports = exportObj;
