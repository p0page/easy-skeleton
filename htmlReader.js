import { extname } from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as htmlMinifier from 'html-minifier';

export default function htmlReader(options = {}) {
  const {
    minify = true,
  } = options;

  return {
    name: 'htmlReader',
    transform(code, id) {
      if (extname(id) !== '.html') return null;

      let resultCode = code;

      if (minify) {
        resultCode = htmlMinifier.minify(resultCode, {
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          ignoreCustomFragments: [],
        });
      }

      return {
        code: `export default ${JSON.stringify(resultCode)}`,
      };
    },
  };
}
