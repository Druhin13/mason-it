import terser from '@rollup/plugin-terser';

export default [
  // UMD build (for browsers)
  {
    input: 'src/mason-it.js',
    output: {
      name: 'MasonIt',
      file: 'dist/mason-it.js',
      format: 'umd'
    }
  },
  // Minified UMD build (for browsers)
  {
    input: 'src/mason-it.js',
    output: {
      name: 'MasonIt',
      file: 'dist/mason-it.min.js',
      format: 'umd'
    },
    plugins: [terser()]
  },
  // ESM build (for bundlers)
  {
    input: 'src/mason-it.js',
    output: {
      file: 'dist/mason-it.esm.js',
      format: 'es'
    }
  }
];