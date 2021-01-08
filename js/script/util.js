import template from './template.html';

// sleep function
export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Check if the node is in the first screen
export const inViewPort = ele => {
  try {
    const rect = ele.getBoundingClientRect();
    return rect.top < window.innerHeight &&
      rect.left < window.innerWidth;

  } catch (e) {
    return true;
  }
};

// Determine if the node has attributes
export const hasAttr = (ele, attr) => {
  try {
    return ele.hasAttribute(attr);
  } catch (e) {
    return false;
  }
};

// Set node transparency
export const setOpacity = ele => {
  if (ele.style) {
    ele.style.opacity = 0;
  }
};

// Unit conversion px -> rem
export const px2rem = px => {
  const pxValue = typeof px === 'string' ? parseInt(px, 10) : px;
  const htmlElementFontSize = getComputedStyle(document.documentElement).fontSize;

  return `${(pxValue / parseInt(htmlElementFontSize, 10))}rem`;
};

// Batch setting element properties
export const setAttributes = (ele, attrs) => {
  Object.keys(attrs).forEach(k => ele.setAttribute(k, attrs[k]));
};

// Delete element
export const removeElement = ele => {
  if (!ele) return;

  const parent = ele.parentNode;
  if (parent) {
    parent.removeChild(ele);
  }
};

export const replaceElement = (ele, newEle) => {
  if (!ele || !newEle) return;

  const parent = ele.parentNode;
  if (parent) {
    parent.replaceChild(newEle, ele)
  }
};

export const createElement = (tagName, attrs = {}) => {
  const node = document.createElement(tagName);
  Object.keys(attrs).forEach(key => {
    node.setAttribute(key, attrs[key]);
  });
  return node;
};

// Check the element pseudo-class to return the corresponding element and width
export const checkHasPseudoEle = ele => {
  if (!ele) return false;

  const beforeComputedStyle = getComputedStyle(ele, '::before');
  const beforeContent = beforeComputedStyle.getPropertyValue('content');
  const beforeWidth = parseFloat(beforeComputedStyle.getPropertyValue('width'), 10) || 0;
  const hasBefore = beforeContent && beforeContent !== 'none';

  const afterComputedStyle = getComputedStyle(ele, '::after');
  const afterContent = afterComputedStyle.getPropertyValue('content');
  const afterWidth = parseFloat(afterComputedStyle.getPropertyValue('width'), 10) || 0;
  const hasAfter = afterContent && afterContent !== 'none';

  const width = Math.max(beforeWidth, afterWidth);

  if (hasBefore || hasAfter) {
    return { hasBefore, hasAfter, ele, width };
  }
  return false;
};

export const urlParser = (url) => {
  const pathPattern = /^#?(\/[^\?\s]*)(\?[^\s]*)?$/;
  let temp;
  if (!url || !(temp = pathPattern.exec(url))) {
    return {
      pathname: '/',
      search: '',
    };
  }
  return {
    pathname: temp[1],
    search: temp[2] || '',
  };
};

export const insertSkeleton = (url, skeletonImageBase64) => {
  if (!skeletonImageBase64) {
    console.warn('The skeleton has not been generated yet');
    return false;
  }

  const { pathname } = urlParser(url);

  const skeletonClass = 'skeleton-remove-after-first-request';
  const skeletonContainerClass = 'skeleton-container';
  const skeletonMap = `<script class="${skeletonClass}">\nwindow.__skeletonMap = {\n${JSON.stringify(pathname)}: ${JSON.stringify(skeletonImageBase64)},\n}\n</script>\n`;

  const content = `<!-- SKELETON -->\n${template}\n<!-- SKELETON -->`
    .replace(/\{\{SKELETON_CLASS\}\}/g, skeletonClass)
    .replace(/\{\{SKELETON_CONTAINER_CLASS\}\}/g, skeletonContainerClass)
    .replace(/\{\{SKELETON_MAP\}\}/g, skeletonMap);

  return {
    html: content,
    img: skeletonImageBase64,
  };
};
