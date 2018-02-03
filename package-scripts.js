const { concurrent } = require('nps-utils');

module.exports = {
  scripts: {
    default: 'parcel index.html',
    build: 'BABEL_ENV=production rollup -c',
    test: {
      default: 'jest',
      watch: 'jest --watch',
      coverage: 'jest --coverage',
    },
    lint: 'eslint src',
    validate: concurrent.nps('lint', 'test'),
  },
};
