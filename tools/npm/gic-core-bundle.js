var cjs = require('rollup-plugin-commonjs');
var node = require('rollup-plugin-node-resolve');
var babel = require('rollup-plugin-babel');

module.exports = {
  input: 'node_modules/@gic/core/dist/index.js',
  external: [
    'tslib',
  ],
  output: {
    amd: {id: '@gic/core'},
    name: '@gic/core',
    file: 'node_modules/@gic/core/core.umd.js',
    format: 'umd',
    exports: 'named',
    globals: {
      'tslib': 'tslib',
    }
  },
  plugins: [
    cjs(),
    node(),
    babel({
      presets: ['@babel/preset-env'],
      runtimeHelpers: true,
      plugins: [
        '@babel/transform-runtime',
      ],
    }),
  ],
};