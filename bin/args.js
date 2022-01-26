const args = process.argv.slice(2);
const template = args[1]?.replace('--template=', '');

module.exports = {
  projectName: args[0] || 'Best-Coding-Practices-Boilerplate',
  template,
};
