import { nodeResolve } from '@rollup/plugin-node-resolve';
import htmlReader from './htmlReader';

export default {
  input: 'js/script/main.js',
  output: {
    file: 'js/script/dist/index.js',
    format: 'iife',
    name: 'EasySkeleton',
  },
  plugins: [htmlReader(), nodeResolve()],
};
