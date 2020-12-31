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
}

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

export const insertSkeleton = (path, skeletonImageBase64) => {
  if (!path || !skeletonImageBase64) {
    console.warn('The skeleton has not been generated yet');
    return false;
  }

  const skeletonMap = `{\n${JSON.stringify(path)}: ${JSON.stringify(skeletonImageBase64)},\n}`;

  const skeletonClass = 'skeleton-remove-after-first-request';
  const skeletonContainerClass = 'skeleton-container'

  const content = `
    <style>
      @keyframes flush {
        0% {
          left: -100%;
        }
        50% {
          left: 0;
        }
        100% {
          left: 100%;
        }
      }
    </style>
    <div class="${skeletonClass}" style="
      animation: flush 2s linear infinite;
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      z-index: 9999;
      background: linear-gradient(to left,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, .85) 50%,
        rgba(255, 255, 255, 0) 100%);
    "></div>
    <div class="${skeletonClass} ${skeletonContainerClass}" style="
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9998;
      background-repeat: no-repeat !important;
      background-size: 100% auto !important;
      background-color: #FFFFFF !important;
      background-position: center 0 !important;
    "></div>
    <script class="${skeletonClass}">
    void function() {
      var skeletonMap = ${skeletonMap};
      if (skeletonMap[window.location.hash]) {
        var node = document.getElementsByClassName('${skeletonContainerClass}')[0];
        node && node.style.setProperty('background-image', 'url("' + skeletonMap[window.location.hash] + '")', 'important');
      }
      window.addEventListener('load', function(){
        setTimeout(function(){
          var removes = document.body.getElementsByClassName('${skeletonClass}');
          removes && Array.prototype.map.call(removes, function(v){ return v; }).forEach(function(item){
            document.body.removeChild(item);
          });
        }, 0);
      });
    }()
    </script>
  `;

  return {
    html: content,
    img: skeletonImageBase64,
  };
};