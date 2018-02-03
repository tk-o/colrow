
const rollupBabel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const uglify = require('rollup-plugin-uglify');
const stripPropTypes = require('rollup-plugin-strip-prop-types');

const pkg = require('./package.json');
const babel = pkg.babel.env.production;

module.exports = {
  input: 'src/components/Colrow.jsx',
  output: [
    {
      name: pkg.name,
      file: pkg.main,
      exports: 'named',
      format: 'cjs',
    },
    {
      file: pkg.module,
      exports: 'named',
      format: 'es',
    }
  ],
  external: ['react', 'react-dom'],
  plugins: [
    nodeResolve({ jsnext: true, main: true }),
    commonjs({ include: 'node_modules/**' }),
    rollupBabel({
      presets: babel.presets,
      plugins: babel.plugins,
      exclude: 'node_modules/**',
      babelrc: false,
    }),
    stripPropTypes(),
    uglify(),
  ],
};
