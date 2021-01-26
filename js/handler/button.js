import {
  BUTTON_CLASS,
  MAIN_COLOR,
} from '../constants';

const buttonHandler = (node) => {
  if (!node.tagName) return;

  node.classList.add(BUTTON_CLASS);

  const { backgroundColor, width, height } = getComputedStyle(node);

  let bgColor = backgroundColor;
  bgColor = bgColor === 'rgba(0, 0, 0, 0)' ? MAIN_COLOR : bgColor;

  node.style.backgroundColor = bgColor;
  node.style.color = bgColor;
  node.style.borderColor = bgColor;
  node.style.width = width;
  node.style.height = height;

  // Clear button content
  node.innerHTML = '';
};

export default buttonHandler;
