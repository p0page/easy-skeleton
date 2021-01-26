import { nodeResolve } from '@rollup/plugin-node-resolve';
import htmlReader from './htmlReader';

export default [
  {
    input: 'js/content.js',
    output: {
      file: 'js/dist/content.js',
      format: 'iife',
      name: 'EasySkeleton',
    },
    plugins: [htmlReader(), nodeResolve()],
  },
  {
    input: 'js/popup.js',
    output: {
      file: 'js/dist/popup.js',
      format: 'iife',
    },
    plugins: [htmlReader()],
  },
  {
    input: 'js/background.js',
    output: {
      file: 'js/dist/background.js',
      format: 'iife',
    },
    plugins: [htmlReader()],
  },
];
