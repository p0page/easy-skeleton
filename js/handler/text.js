import {
  px2rem,
  setOpacity,
} from '../util';
import {
  MAIN_COLOR,
  SKELETON_TEXT_CLASS,
} from '../constants';
import handlerButton from './button';

const setStylesInNode = (nodes) => {
  Array.from(nodes).forEach((node) => {
    if (!node || !node.tagName) return;
    const comStyle = getComputedStyle(node);
    Object.assign(node.style, {
      marginLeft: comStyle.marginLeft,
      marginRight: comStyle.marginRight,
      marginTop: comStyle.marginTop,
      marginBottom: comStyle.marginBottom,
      paddingLeft: comStyle.paddingLeft,
      paddingRight: comStyle.paddingRight,
      paddingTop: comStyle.paddingTop,
      paddingBottom: comStyle.paddingBottom,
      fontSize: comStyle.fontSize,
      lineHeight: comStyle.lineHeight,
      position: comStyle.position,
      textAlign: comStyle.textAlign,
      wordSpacing: comStyle.wordSpacing,
      wordBreak: comStyle.wordBreak,
      dispaly: comStyle.dispaly,
      boxSizing: comStyle.boxSizing,
    });

    if (node.childNodes) {
      setStylesInNode(node.childNodes);
    }
  });
};

const getTextWidth = (ele, style) => {
  const MOCK_TEXT_ID = 'skeleton-text-id';
  let offScreenParagraph = document.querySelector(`#${MOCK_TEXT_ID}`);
  if (!offScreenParagraph) {
    const wrapper = document.createElement('p');
    offScreenParagraph = document.createElement('span');
    Object.assign(wrapper.style, {
      width: '10000px',
      position: 'absolute',
      top: '0',
    });
    offScreenParagraph.id = MOCK_TEXT_ID;
    offScreenParagraph.style.visibility = 'hidden';
    wrapper.appendChild(offScreenParagraph);
    document.body.appendChild(wrapper);
  }
  Object.assign(offScreenParagraph.style, style);
  if (ele.childNodes) setStylesInNode(ele.childNodes);
  offScreenParagraph.innerHTML = ele.innerHTML;
  return offScreenParagraph.getBoundingClientRect().width;
};

const addTextMask = (paragraph, {
  textAlign,
  lineHeight,
  paddingBottom,
  paddingLeft,
  paddingRight,
}, maskWidthPercent = 0.5) => {
  let left;
  let right;
  switch (textAlign) {
    case 'center':
      left = document.createElement('span');
      right = document.createElement('span');
      [left, right].forEach((mask) => {
        Object.assign(mask.style, {
          display: 'inline-block',
          width: `${(maskWidthPercent / 2) * 100}%`,
          height: lineHeight,
          background: '#fff',
          position: 'absolute',
          bottom: paddingBottom,
        });
      });
      left.style.left = paddingLeft;
      right.style.right = paddingRight;
      paragraph.appendChild(left);
      paragraph.appendChild(right);
      break;
    case 'right':
      left = document.createElement('span');
      Object.assign(left.style, {
        display: 'inline-block',
        width: `${maskWidthPercent * 100}%`,
        height: lineHeight,
        background: '#fff',
        position: 'absolute',
        bottom: paddingBottom,
        left: paddingLeft,
      });
      paragraph.appendChild(left);
      break;
    case 'left':
    default:
      right = document.createElement('span');
      Object.assign(right.style, {
        display: 'inline-block',
        width: `${maskWidthPercent * 100}%`,
        height: lineHeight,
        background: '#fff',
        position: 'absolute',
        bottom: paddingBottom,
        right: paddingRight,
      });
      paragraph.appendChild(right);
      break;
  }
};

const handleTextStyle = (ele, width) => {
  const comStyle = getComputedStyle(ele);
  let { lineHeight } = comStyle;
  const {
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    position: pos,
    fontSize,
    textAlign,
    wordSpacing,
    wordBreak,
  } = comStyle;
  if (!/\d/.test(lineHeight)) {
    const fontSizeNum = parseInt(fontSize, 10) || 14;
    lineHeight = `${fontSizeNum * 1.4}px`;
  }

  const position = ['fixed', 'absolute', 'flex'].find((p) => p === pos) ? pos : 'relative';

  const height = ele.offsetHeight;
  // Round down
  let lineCount = (height - parseFloat(paddingTop, 10) - parseFloat(paddingBottom, 10))
  / parseFloat(lineHeight, 10) || 0;

  lineCount = lineCount < 1.5 ? 1 : lineCount;

  const textHeightRatio = 0.6; // Default

  // Add text block class name tag
  ele.classList.add(SKELETON_TEXT_CLASS);

  Object.assign(ele.style, {
    backgroundImage: `linear-gradient(
        transparent ${((1 - textHeightRatio) / 2) * 100}%,
        ${MAIN_COLOR} 0%,
        ${MAIN_COLOR} ${((1 - textHeightRatio) / 2 + textHeightRatio) * 100}%,
        transparent 0%
      )`,
    backgroundSize: `100% ${px2rem(parseInt(lineHeight, 10) * 1.1)}`,
    position,
  });

  // add white mask
  if (lineCount > 1) {
    addTextMask(ele, Object.assign(JSON.parse(JSON.stringify(comStyle)), {
      lineHeight,
    }));
  } else {
    const textWidth = getTextWidth(ele, {
      fontSize,
      lineHeight,
      wordBreak,
      wordSpacing,
    });
    const textWidthPercent = textWidth
    / (width - parseInt(paddingRight, 10) - parseInt(paddingLeft, 10));

    ele.style.backgroundSize = `${textWidthPercent * 100}% 100%`;
    switch (textAlign) {
      case 'left':
        break;
      case 'center':
        ele.style.backgroundPositionX = '50%';
        break;
      case 'right':
        ele.style.backgroundPositionX = '100%';
        break;
      default:
        break;
    }
  }
};

const textHandler = (ele, options) => {
  const {
    width,
  } = ele.getBoundingClientRect();

  // Elements with a width less than N are not handled
  const minGrayBlockWidth = options.minGrayBlockWidth || 30;
  if (width <= minGrayBlockWidth) {
    setOpacity(ele);
    return;
  }

  // If it is a button, it ends early
  const isBtn = /(btn)|(button)/g.test(ele.getAttribute('class'));
  if (isBtn) {
    handlerButton(ele);
    return;
  }

  // Handling text styles
  handleTextStyle(ele, width);
};

export default textHandler;
