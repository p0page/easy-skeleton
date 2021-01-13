import skeletonTemplate from './template/skeleton.html';
import {
  SKELETON_DIVIDER,
  SKELETON_CLASS,
  SKELETON_CONTAINER_CLASS,
  SKELETON_MAP_PREFIX,
  SKELETON_MAP_SUFFIX,
} from './constants';

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

export const request = ({
  url,
  data,
  method = 'GET',
  headers = {},
  responseType = 'json',
  ...rest
}) => fetch(url, {
  ...rest,
  method,
  headers: { 'Content-Type': 'application/json', ...headers },
  body: data && JSON.stringify(data),
}).then(res => ['json', 'text', 'formData', 'blob', 'arrayBuffer'].includes(responseType) ? res[responseType]() : res.text());

export const urlParser = (url) => {
  const pathPattern = /^#?(\/[^\?\s]*)(\?[^\s]*)?$/;
  let tmp;
  if (!url || !(tmp = pathPattern.exec(url))) {
    return {
      pathname: '/',
      search: '',
    };
  }
  return {
    pathname: tmp[1],
    search: tmp[2] || '',
  };
};

export const skeletonRegExp = new RegExp(`${SKELETON_DIVIDER}([\\s\\S]*)${SKELETON_DIVIDER}`);

export const getSkeletonInjectContent = (val) => {
  if (!val || typeof val !== 'string') return '';

  const tmp = skeletonRegExp.exec(val);

  return tmp ? tmp[1] : '';
};

// export const injectContentToBody = (html, injectData) => {
//   if (!html || !injectData || typeof html !== 'string') throw new Error('传入参数不合法');

//   html = html.replace(skeletonRegExp, '');
  
//   const doc = new DOMParser().parseFromString(html, 'text/html');
//   const bodyDoc = doc.querySelector('body');
//   console.log(doc);

//   if (!bodyDoc) throw new Error('传入代码不包含body');

//   bodyDoc.innerHTML = injectData + bodyDoc.innerHTML;
//   return new XMLSerializer().serializeToString(doc);
// };

export const getSkeletonMap = (val) => {
  if (!val || typeof val !== 'string') return '';

  const regExp = new RegExp(`${SKELETON_MAP_PREFIX.replace('\n', '\\s*')}\\s*(\\{[\\s\\S]*\\})\\s*${SKELETON_MAP_SUFFIX}`);

  let tmp;
  let res = {};

  try {
    if (tmp = regExp.exec(val)) res = JSON.parse(tmp[1]);
  } catch {
    return {};
  }
  return res || {};
};

export const insertSkeleton = (url, skeletonImageBase64, originalSkeletonMap = {}) => {
  if (!skeletonImageBase64) {
    console.warn('The skeleton has not been generated yet');
    return false;
  }

  const { pathname } = urlParser(url);
  const skeletonMap = {
    ...originalSkeletonMap,
    [pathname]: skeletonImageBase64,
  }

  const content = `${SKELETON_DIVIDER}\n${skeletonTemplate}\n${SKELETON_DIVIDER}`
    .replace(/\{\{SKELETON_CLASS\}\}/g, SKELETON_CLASS)
    .replace(/\{\{SKELETON_CONTAINER_CLASS\}\}/g, SKELETON_CONTAINER_CLASS)
    .replace(/\{\{SKELETON_MAP\}\}/g, `${SKELETON_MAP_PREFIX}${JSON.stringify(skeletonMap, null, 2)}\n${SKELETON_MAP_SUFFIX}\n`);

  return {
    html: content,
    img: skeletonImageBase64,
  };
};
