import {
  px2rem,
  removeElement,
} from '../util';

const svgHandler = (node) => {
  const { width, height } = node.getBoundingClientRect();

  // Remove elements if they are not visible
  if (width === 0 || height === 0 || node.getAttribute('aria-hidden') === 'true') {
    removeElement(node);
    return;
  }

  // Clear node centent
  node.innerHTML = '';

  // Set style
  Object.assign(node.style, {
    width: px2rem(parseInt(width, 10)),
    height: px2rem(parseInt(height, 10)),
  });
};

export default svgHandler;
