import {
  MAIN_COLOR,
  SMALLEST_BASE64,
} from '../constants';
import {
  setAttributes,
} from '../util';

const imgHandler = (node) => {
  const { width, height } = node.getBoundingClientRect();

  setAttributes(node, {
    width,
    height,
    src: SMALLEST_BASE64,
  });

  node.removeAttribute('srcset');

  node.style.backgroundColor = MAIN_COLOR;
};

export default imgHandler;
