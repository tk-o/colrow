
const rollupBabel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

const pkg = require('./package.json');
const babel = pkg.babel.env.production;

module.exports = {
  input: 'src/components/Colrow.jsx',
  output: [
    {
      name: pkg.name,
      file: pkg.main,
      exports: 'named',
      format: 'umd',
    },
    {
      file: pkg.module,
      exports: 'named',
      format: 'es',
    }
  ],
  sourceMap: true,
  external: ['react'],
  globals: {
    'react': 'React'
  },
  plugins: [
    nodeResolve({ jsnext: true, main: true }),
    commonjs({ include: 'node_modules/**' }),
    rollupBabel({
      presets: babel.presets,
      plugins: babel.plugins,
      exclude: 'node_modules/**',
      babelrc: false,
    }),
  ],
};
