const { concurrent } = require('nps-utils');

module.exports = {
  scripts: {
    default: 'parcel ./example/index.html',
    build: 'BABEL_ENV=production rollup -c',
    test: {
      default: 'jest',
      watch: 'jest --watch',
      coverage: 'jest --coverage',
      ci: 'jest --ci',
    },
    lint: 'eslint src',
    validate: concurrent.nps('lint', 'test'),
  },
};
