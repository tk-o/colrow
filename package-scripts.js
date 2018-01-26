const { concurrent } = require('nps-utils');

module.exports = {
  scripts: {
    default: 'parcel -p index.html',
    build: 'parcel build src/colrow.jsx --out-dir build',
    test: {
      default: 'jest',
      watch: 'jest --watch',
      coverage: 'jest --coverage',
    },
    lint: 'eslint src',
    validate: concurrent.nps('lint', 'test'),
  },
};
