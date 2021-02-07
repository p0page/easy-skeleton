(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    function e(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e));}catch(e){i(e);}}function u(e){try{c(r.throw(e));}catch(e){i(e);}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t);}))).then(a,u);}c((r=r.apply(e,t||[])).next());}))}function t(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a);}catch(e){i=[6,e],r=0;}finally{n=o=0;}if(5&i[0])throw i[1];return {value:i[0]?i[1]:void 0,done:!0}}([i,u])}}}(function(){(console.warn||console.log).apply(console,arguments);}).bind("[clipboard-polyfill]");var i,a,u,c,l="undefined"==typeof navigator?void 0:navigator,d=null==l?void 0:l.clipboard,s=(null===(i=null==d?void 0:d.read)||void 0===i||i.bind(d),null===(a=null==d?void 0:d.readText)||void 0===a?void 0:a.bind(d)),f=(null===(u=null==d?void 0:d.write)||void 0===u||u.bind(d),null===(c=null==d?void 0:d.writeText)||void 0===c?void 0:c.bind(d)),p="undefined"==typeof window?void 0:window,v=(null==p||p.ClipboardItem,p);function b(){return "undefined"==typeof ClipboardEvent&&void 0!==v.clipboardData&&void 0!==v.clipboardData.setData}var m=function(){this.success=!1;};function h(e,t,n){for(var o in e.success=!0,t){var i=t[o],a=n.clipboardData;a.setData(o,i),"text/plain"===o&&a.getData(o)!==i&&(e.success=!1);}n.preventDefault();}function w(e){var t=new m,n=h.bind(this,t,e);document.addEventListener("copy",n);try{document.execCommand("copy");}finally{document.removeEventListener("copy",n);}return t.success}function g(e,t){x(e);var n=w(t);return E(),n}function x(e){var t=document.getSelection();if(t){var n=document.createRange();n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n);}}function E(){var e=document.getSelection();e&&e.removeAllRanges();}function D(n){return e(this,void 0,void 0,(function(){var e;return t(this,(function(t){if(e="text/plain"in n,b()){if(!e)throw new Error("No `text/plain` value was specified.");if(o=n["text/plain"],v.clipboardData.setData("Text",o))return [2,!0];throw new Error("Copying failed, possibly because the user rejected it.")}var o;return w(n)?([2,!0]):navigator.userAgent.indexOf("Edge")>-1?([2,!0]):g(document.body,n)?([2,!0]):function(e){var t=document.createElement("div");t.setAttribute("style","-webkit-user-select: text !important"),t.textContent="temporary element",document.body.appendChild(t);var n=g(t,e);return document.body.removeChild(t),n}(n)?([2,!0]):function(e){var t=document.createElement("div");t.setAttribute("style","-webkit-user-select: text !important");var n=t;t.attachShadow&&(n=t.attachShadow({mode:"open"}));var o=document.createElement("span");o.innerText=e,n.appendChild(o),document.body.appendChild(t),x(o);var i=document.execCommand("copy");return E(),document.body.removeChild(t),i}(n["text/plain"])?([2,!0]):[2,!1]}))}))}function C(n){return e(this,void 0,void 0,(function(){return t(this,(function(e){if(f)return [2,f(n)];if(!D(function(e){var t={};return t["text/plain"]=e,t}(n)))throw new Error("writeText() failed");return [2]}))}))}

    var skeletonTemplate = "{{SKELETON_MAP}}<style>@keyframes flush{0%{left:-100%}50%{left:0}100%{left:100%}}</style><div class=\"{{SKELETON_CLASS}}\" style=\"animation:flush 2s linear infinite;position:absolute;top:0;bottom:0;width:100%;z-index:9999;background:linear-gradient(to left,rgba(255,255,255,0) 0,rgba(255,255,255,.85) 50%,rgba(255,255,255,0) 100%)\"></div><div class=\"{{SKELETON_CLASS}} {{SKELETON_CONTAINER_CLASS}}\" style=\"position:absolute;top:0;left:0;right:0;bottom:0;z-index:9998;background-repeat:no-repeat!important;background-size:100% auto!important;background-color:#fff!important;background-position:center 0!important\"></div><script class=\"{{SKELETON_CLASS}}\">!function(){function r(e){var t=e.replace(/\\+/g,\" \");try{return decodeURIComponent(t)}catch(e){return t}}function o(e){return e&&(tmp=/^#?(\\/[^\\?\\s]*)(\\?[^\\s]*)?$/.exec(e))?{pathname:tmp[1],query:(e=tmp[2])&&\"string\"==typeof e?e.replace(/^\\?/,\"\").split(\"&\").reduce((e,t)=>{var n=t.indexOf(\"=\");return-1===n?e[r(t)]=\"\":e[r(t.slice(0,n))]=r(t.slice(n+1)),e},{}):{}}:{pathname:\"/\",query:{}}}try{var e=o(window.location.hash),a=e.pathname,c=e.query;window.__removeSkeleton=function(){setTimeout(function(){var e=document.body.getElementsByClassName(\"{{SKELETON_CLASS}}\");if(e)for(var t=e.length-1;0<=t;t--)document.body.removeChild(e[t])},0)},Object.keys(window.__skeletonMap).some(function(e){var t,n,r=o(e);if(r.pathname===a&&(t=r.query,n=c,t&&n&&Object.keys(t).every(function(e){return t[e]===n[e]}))){r=document.getElementsByClassName(\"{{SKELETON_CONTAINER_CLASS}}\")[0];return r&&r.style.setProperty(\"background-image\",'url(\"'+window.__skeletonMap[e]+'\")',\"important\"),!0}})||window.__removeSkeleton()}catch(e){console.error(e)}}()</script>";

    // Skeleton main color
    const MAIN_COLOR = '#EEEEEE';
    const MAIN_COLOR_RGB = 'rgb(238, 238, 238)';

    // Pseudo-class style
    const PSEUDO_CLASS = 'sk-pseudo';

    // button style
    const BUTTON_CLASS = 'sk-button';

    // Transparent style
    const TRANSPARENT_CLASS = 'sk-transparent';

    // Transparent 1 pixel image
    const SMALLEST_BASE64 = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

    // text class
    const SKELETON_TEXT_CLASS = 'skeleton-text-block-mark';

    // List item Tag
    const LIST_ITEM_TAG = ['LI', 'DT', 'DD'];

    const SKELETON_DIVIDER = '<!-- SKELETON -->';
    const SKELETON_CLASS = 'skeleton-remove-after-first-request';
    const SKELETON_MAP_CLASS = 'skeleton-map-remove-after-first-request';
    const SKELETON_CONTAINER_CLASS = 'skeleton-container-remove-after-first-request';
    const SKELETON_MAP_PREFIX = `<script class="${SKELETON_CLASS} ${SKELETON_MAP_CLASS}">\nwindow.__skeletonMap = `;
    const SKELETON_MAP_SUFFIX = '</script>';

    const SKELETON_MAP_REGEXP = new RegExp(
      `<script class="?${SKELETON_CLASS}\\s*(?:${SKELETON_MAP_CLASS})?"?>([\\s\\S]*?window.__skeletonMap\\s*=[\\s\\S]*?)${SKELETON_MAP_SUFFIX}`,
    );

    // sleep function
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Check if the node is in the first screen
    const inViewPort = (ele) => {
      try {
        const rect = ele.getBoundingClientRect();
        return rect.top < window.innerHeight
          && rect.left < window.innerWidth;
      } catch (e) {
        return true;
      }
    };

    // Determine if the node has attributes
    const hasAttr = (ele, attr) => {
      try {
        return ele.hasAttribute(attr);
      } catch (e) {
        return false;
      }
    };

    // Set node transparency
    const setOpacity = (ele) => {
      if (ele.style) {
        ele.style.opacity = 0;
      }
    };

    // Unit conversion px -> rem
    const px2rem = (px) => {
      const pxValue = typeof px === 'string' ? parseInt(px, 10) : px;
      const htmlElementFontSize = getComputedStyle(document.documentElement).fontSize;

      return `${(pxValue / parseInt(htmlElementFontSize, 10))}rem`;
    };

    // Batch setting element properties
    const setAttributes = (ele, attrs) => {
      Object.keys(attrs).forEach((k) => ele.setAttribute(k, attrs[k]));
    };

    // Delete element
    const removeElement = (ele) => {
      if (!ele) return;

      const parent = ele.parentNode;
      if (parent) {
        parent.removeChild(ele);
      }
    };

    const replaceElement = (ele, newEle) => {
      if (!ele || !newEle) return;

      const parent = ele.parentNode;
      if (parent) {
        parent.replaceChild(newEle, ele);
      }
    };

    const createElement = (tagName, attrs = {}) => {
      const node = document.createElement(tagName);
      Object.keys(attrs).forEach((key) => {
        node.setAttribute(key, attrs[key]);
      });
      return node;
    };

    // Check the element pseudo-class to return the corresponding element and width
    const checkHasPseudoEle = (ele) => {
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
        return {
          hasBefore, hasAfter, ele, width,
        };
      }
      return false;
    };

    const decode = (str) => {
      const strWithoutPlus = str.replace(/\+/g, ' ');
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e) {
        return strWithoutPlus;
      }
    };

    const parseSearch = (search) => {
      if (!search || typeof search !== 'string') return {};
      const parts = search.replace(/^\?/, '').split('&');
      return parts.reduce((res, part) => {
        const pos = part.indexOf('=');
        if (pos === -1) {
          res[decode(part)] = '';
        } else {
          res[decode(part.slice(0, pos))] = decode(part.slice(pos + 1));
        }
        return res;
      }, {});
    };

    const urlParser = (url) => {
      const pathPattern = /^#?(\/[^?\s]*)(\?[^\s]*)?$/;
      let tmp;
      // eslint-disable-next-line no-cond-assign
      if (!url || !(tmp = pathPattern.exec(url))) {
        return {
          pathname: '/',
          query: {},
        };
      }
      return {
        pathname: tmp[1],
        query: parseSearch(tmp[2]),
      };
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

    const compileCode = (code = '') => {
      if (typeof code !== 'string') return undefined;

      const sandbox = new Proxy({}, {
        has() {
          return true; // 欺骗，告知属性存在
        },
      });

      return new Function(
        'sandbox', `with (sandbox) {const window={__skeletonMap:{}};${code};return window.__skeletonMap;}`,
      )(sandbox);
    };

    const getSkeletonMap = (val) => {
      if (!val || typeof val !== 'string') return '';

      let res = {};

      try {
        const tmp = SKELETON_MAP_REGEXP.exec(val);
        if (tmp) res = compileCode(tmp[1]);
      } catch (e) {
        return {};
      }
      return res || {};
    };

    const insertSkeleton = (url, skeletonImageBase64, originalSkeletonMap = {}) => {
      if (!skeletonImageBase64) {
        console.warn('The skeleton has not been generated yet');
        return false;
      }

      const { pathname } = urlParser(url);
      const skeletonMap = {
        ...originalSkeletonMap,
        [pathname]: skeletonImageBase64,
      };

      const content = `${SKELETON_DIVIDER}\n${skeletonTemplate}\n${SKELETON_DIVIDER}`
        .replace(/\{\{SKELETON_CLASS\}\}/g, SKELETON_CLASS)
        .replace(/\{\{SKELETON_CONTAINER_CLASS\}\}/g, SKELETON_CONTAINER_CLASS)
        .replace(
          /\{\{SKELETON_MAP\}\}/g,
          `${SKELETON_MAP_PREFIX}${JSON.stringify(skeletonMap, null, 2)}\n${SKELETON_MAP_SUFFIX}\n`,
        );

      return {
        html: content,
        img: skeletonImageBase64,
      };
    };

    const aHandler = (node) => {
      node.removeAttribute('href');
    };

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
        buttonHandler(ele);
        return;
      }

      // Handling text styles
      handleTextStyle(ele, width);
    };

    const listHandler = (node, options) => {
      if (!options.openRepeatList || !node.children.length) return;

      const { children } = node;
      const len = Array.from(children)
        .filter((child) => LIST_ITEM_TAG.indexOf(child.tagName) > -1).length;

      if (len === 0) return;

      const firstChild = children[0];
      // Solve the bug that sometimes the ul element child element is not a specified list element.
      if (LIST_ITEM_TAG.indexOf(firstChild.tagName) === -1) {
        listHandler(firstChild, options);
        return;
      }

      // Keep only the first list element
      Array.from(children).forEach((li, index) => {
        if (index > 0) {
          removeElement(li);
        }
      });

      // Set all sibling elements of LI to the same element to ensure that the generated page skeleton is neat
      for (let i = 1; i < len; i += 1) {
        node.appendChild(firstChild.cloneNode(true));
      }
    };

    const emptyHandler = (node) => {
      node.innerHTML = '';

      let classNameArr = node.className && node.className.split(' ');
      classNameArr = classNameArr.map((item) => `.${item}`);
      const className = classNameArr.join('');
      const id = node.id ? `#${node.id}` : '';
      const query = className || id;

      if (!query) return;

      let styleSheet;

      // eslint-disable-next-line no-restricted-syntax
      for (const item of document.styleSheets) {
        if (!item.href) {
          styleSheet = item;
          return;
        }
      }

      try {
        if (styleSheet) {
          styleSheet.insertRule(`${query}::before{content:'' !important;background:none !important;}`, 0);
          styleSheet.insertRule(`${query}::after{content:'' !important;background:none !important;}`, 0);
        }
      } catch (e) {
        console.log('handleEmptyNode Error: ', JSON.stringify(e));
      }
    };

    function styleHandler() {
      if (!document.head.querySelector('#skeleton-block-style')) {
        const skeletonBlockStyleEle = document.createElement('style');

        skeletonBlockStyleEle.id = 'skeleton-block-style';

        skeletonBlockStyleEle.innerText = `
      .${SKELETON_TEXT_CLASS},
      .${SKELETON_TEXT_CLASS} * {
        background-origin: content-box;
        background-clip: content-box;
        background-color: transparent !important;
        color: transparent !important;
        background-repeat: repeat-y;
      }

      .${PSEUDO_CLASS}::before,
      .${PSEUDO_CLASS}::after {
        background: ${MAIN_COLOR} !important;
        background-image: none !important;
        color: transparent !important;
        border-color: transparent !important;
        border-radius: 0 !important;
      }

      .${BUTTON_CLASS} {
        box-shadow: none !important;
      }

      .${TRANSPARENT_CLASS}::before,
      .${TRANSPARENT_CLASS}::after {
        opacity: 0 !important;
      }
    `.replace(/\n/g, '');

        document.head.append(skeletonBlockStyleEle);
      }

      // if (!document.head.querySelector('#skeleton-buttons-css')) {
      //   const skeletonButtonCss = document.createElement('link');

      //   skeletonButtonCss.type = 'text/css';
      //   skeletonButtonCss.rel = 'stylesheet';
      //   skeletonButtonCss.href = 'css/buttons.css'
      //   skeletonButtonCss.id = 'skeleton-buttons-css';

      //   document.head.append(skeletonButtonCss);
      // }
    }

    const inputHandler = (node) => {
      node.removeAttribute('placeholder');
      node.value = '';
    };

    const scriptHandler = (node) => {
      removeElement(node);
    };

    const pseudoHandler = (node, options) => {
      if (!node.tagName) return;

      const pseudo = checkHasPseudoEle(node);

      if (!pseudo || !pseudo.ele) return;

      const { ele, width } = pseudo;

      // Width is less than the hiding threshold
      if (width < options.minGrayPseudoWidth) {
        ele.classList.add(TRANSPARENT_CLASS);
        return;
      }

      ele.classList.add(PSEUDO_CLASS);
    };

    const beforeHandler = (node, options) => {
      if (!node.tagName) return;

      // Handling empty elements of user tags
      if (hasAttr(node, 'data-skeleton-empty')) {
        emptyHandler(node);
      }

      // Width is less than the hiding threshold
      const { width } = node.getBoundingClientRect();
      if (width < options.minGrayBlockWidth) {
        setOpacity(node);
      }

      const ComputedStyle = getComputedStyle(node);

      // The background image is changed to the main color
      if (ComputedStyle.backgroundImage !== 'none') {
        node.style.backgroundImage = 'none';
        node.style.background = MAIN_COLOR;
      }

      // The Shadow is changed to the main color
      if (ComputedStyle.boxShadow !== 'none') {
        const oldBoxShadow = ComputedStyle.boxShadow;
        const newBoxShadow = oldBoxShadow.replace(/^rgb.*\)/, MAIN_COLOR_RGB);
        node.style.boxShadow = newBoxShadow;
      }

      // The border is changed to the main color
      if (ComputedStyle.borderColor) {
        node.style.borderColor = MAIN_COLOR;
      }

      // Set the background color of the user class
      const bgColor = node.getAttribute('data-skeleton-bgcolor');
      if (bgColor) {
        node.style.backgroundColor = bgColor;
        node.style.color = 'transparent';
      }
    };

    const EasySkeleton = {
      initData() {
        this.options = null;
        this.originalNode = null;
        this.previewNode = null;
        this.isPreview = false;

        this.btnGroup = null;
        this.previewBtn = null;
        this.submitBtn = null;
        this.cancelBtn = null;
      },

      captureScreen() {
        return new Promise((resolve, reject) => {
          const timer = setTimeout(() => {
            reject(new Error('截图超时'));
          }, 5000);

          chrome.runtime.sendMessage({
            command: 'CAPTURE',
          }, (res) => {
            clearTimeout(timer);
            resolve(res);
          });
        });
      },

      request(options) {
        return new Promise((resolve) => {
          chrome.runtime.sendMessage({
            command: 'REQUEST',
            options,
          }, (res) => {
            resolve(res);
          });
        });
      },

      // Entry function
      async genSkeleton(options) {
        if (this.previewNode) {
          alert('已有骨架屏正在生成中');
          return;
        }

        this.initData();
        this.options = options;
        if (options.debug) {
          await this.debugGenSkeleton(options);
        } else {
          await this.startGenSkeleton(options);
        }
      },

      // genPreviewContainer() {
      //   const node = document.createElement('div');
      //   node.id = '#skeleton-preview-container';
      //   node.style = 'position:absolute;width:100vw;top:0;left:0;z-index:999999';
      //   return node;
      // },

      toggleView(val) {
        const newVal = val === undefined ? !this.isPreview : !!val;

        if (newVal === this.isPreview) return newVal;

        if (newVal) {
          replaceElement(this.originalNode, this.previewNode);
        } else {
          replaceElement(this.previewNode, this.originalNode);
        }

        if (this.previewBtn) {
          const iconEle = this.previewBtn.querySelector('.icon-eye');
          if (iconEle) iconEle.className = newVal ? 'icon-eye icon-eye_ban' : 'icon-eye';
        }
        this.isPreview = newVal;
        return newVal;
      },

      genButton() {
        const BUTTON_GROUP_CLASS = 'sk-button-group';
        if (document.querySelector(`#${BUTTON_GROUP_CLASS}`)) return;

        this.btnGroup = createElement('ol', {
          class: 'button-group',
        });
        const buttons = Array.from(Array(3)).map(() => createElement('li', {
          class: 'sk-button',
        }));
        const [previewBtn, cancelBtn, submitBtn] = buttons;
        this.previewBtn = previewBtn;
        this.cancelBtn = cancelBtn;
        this.submitBtn = submitBtn;

        this.previewBtn.innerHTML = '<i class="icon-eye icon-eye_ban"><i/></i>';
        this.cancelBtn.innerHTML = '<i class="icon-close"></i>';
        // cancelBtn.className += ' button-caution';
        this.submitBtn.innerHTML = '<i class="icon-check"></i>';
        // submitBtn.className += ' button-primary';

        this.btnGroup.append(this.previewBtn);
        this.btnGroup.append(this.cancelBtn);
        this.btnGroup.append(this.submitBtn);

        const container = createElement('div', { id: BUTTON_GROUP_CLASS });
        container.append(this.btnGroup);

        this.previewBtn.addEventListener('click', () => { this.toggleView(); });
        this.cancelBtn.addEventListener('click', () => {
          removeElement(container);
          this.toggleView(false);
          this.initData();
        });
        this.submitBtn.addEventListener('click', async () => {
          removeElement(container);
          this.toggleView(true);
          await sleep(500);
          const imgBase64 = await this.captureScreen();

          let originalHtml;
          try {
            originalHtml = await this.request({
              url: window.location.href,
              responseType: 'text',
            });
          } catch (e) {
            console.error('==genSkeleton Error==\n', e);
            alert('获取当前网页源码失败，将无法自动获取已经接入的骨架屏信息，请手动进行处理');
          }
          // const injectContent = getSkeletonInjectContent(originalHtml);
          const originalSkeletonMap = getSkeletonMap(originalHtml);
          const { html } = insertSkeleton(window.location.hash, imgBase64, originalSkeletonMap);

          this.toggleView(false);
          C(html).then(() => {
            alert('骨架屏代码已经复制到了你的剪贴板');
          });
          this.initData();
        });

        document.documentElement.append(container);
      },

      removeScript(node) {
        if (!node) return;

        const tagName = node.tagName && node.tagName.toUpperCase();
        if (tagName === 'SCRIPT') {
          removeElement(node);
          return;
        }

        Array.from(node.childNodes || []).forEach((x) => {
          this.removeScript(x);
        });
      },

      // Start generating the skeleton
      async startGenSkeleton(options) {
        this.originalNode = (options.el && document.querySelector(options.el)) || document.body;
        this.previewNode = this.originalNode.cloneNode(true);
        this.removeScript(this.previewNode);
        // const node = originalNode;

        try {
          this.init();
          // const previewContainer = this.genPreviewContainer();
          // previewContainer.appendChild(node);
          this.genButton();
          this.toggleView(true);
          this.handleNode(this.previewNode);
        } catch (e) {
          console.error('==genSkeleton Error==\n', e.message, e.stack);
        }
      },

      // The Debug mode generates a skeleton diagram for debugging.
      // There will be a button at the top of the page, and click to generate a skeleton map.
      async debugGenSkeleton(options) {
        const switchWrapElement = document.createElement('div');
        switchWrapElement.style.height = '100px';
        const switchElement = document.createElement('button');
        switchElement.innerHTML = '开始生成骨架图';
        Object.assign(switchElement.style, {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 9999,
          color: '#FFFFFF',
          background: 'red',
          fontSize: '30px',
          height: '100px',
        });
        switchWrapElement.appendChild(switchElement);
        document.body.prepend(switchWrapElement);

        // Need to wait for event processing, so use Promise for packaging
        return new Promise((resolve, reject) => {
          try {
            switchElement.onclick = async () => {
              removeElement(switchWrapElement);
              await this.startGenSkeleton(options);
              await sleep(options.debugTime || 0);
              resolve();
            };
          } catch (e) {
            console.error('==startGenSkeleton Error==', e);
            reject(e);
          }
        });
      },

      // Initialization processing DOM
      init() {
        // if (this.isPreview) this.toggleView(false);
        this.cleanSkeletonContainer();
        styleHandler();
      },

      // Remove skeleton image html and style from the page to avoid interference
      cleanSkeletonContainer(node) {
        const skeletonWrap = (node || document.body).querySelector('#nozomi-skeleton-html-style-container');
        if (skeletonWrap) {
          removeElement(skeletonWrap);
        }
      },

      /**
       * Processing text nodes
       * @param {*} node Node
       * @return {Boolean} True means that processing has been completed, false means that processing still needs to be continued
       */
      handleText(node) {
        const tagName = node.tagName && node.tagName.toUpperCase();

        // Processing <div>xxx</div> or <a>xxx</a>
        if (node.childNodes && node.childNodes.length === 1 && node.childNodes[0].nodeType === 3) {
          textHandler(node, this.options);
          return true;
        }

        // Processing xxx，change to <i>xxx</i>
        if (node && node.nodeType === 3 && node.textContent) {
          const parent = node.parentNode;
          // Determine if it has been processed
          if (!parent.classList.contains(SKELETON_TEXT_CLASS)) {
            // It is plain text itself and needs to be replaced with a node
            const textContent = node.textContent.replace(/[\r\n]/g, '').trim();
            if (textContent) {
              const tmpNode = document.createElement('i');
              tmpNode.classList.add(SKELETON_TEXT_CLASS);
              tmpNode.innerText = textContent;
              node.parentNode.replaceChild(tmpNode, node);
              textHandler(tmpNode, this.options);
              return true;
            }
          }
        }

        // Processing <span>111<a>222</a></span> <span>111<img src="xx" /></span>
        if (tagName === 'SPAN' && node.innerHTML) {
          // Process image and background image first
          this.handleImages(node.childNodes);

          textHandler(node, this.options);
          return true;
        }

        return false;
      },

      // The text nodes are processed uniformly, and the background image, IMG, SVG, etc. need to be processed again.
      handleImages(nodes) {
        if (!nodes) return;

        Array.from(nodes).forEach((node) => {
          if (hasAttr(node, 'data-skeleton-ignore')) return;

          beforeHandler(node, this.options);
          pseudoHandler(node, this.options);
          const tagName = node.tagName && node.tagName.toUpperCase();
          if (tagName === 'IMG') {
            imgHandler(node);
          } else if (tagName === 'SVG') {
            svgHandler(node);
          } else {
            this.handleImages(node.childNodes);
          }
        });
      },

      // Processing node list
      handleNodes(nodes) {
        if (!nodes.length) return;

        Array.from(nodes).forEach((node) => {
          this.handleNode(node);
        });
      },

      // Processing a single node
      handleNode(node) {
        if (!node) return;

        // Delete elements that are not in first screen, or marked for deletion
        if (!inViewPort(node) || hasAttr(node, 'data-skeleton-remove')) {
          removeElement(node);
          return;
        }

        // Handling elements that are ignored by user tags -> End
        const ignore = hasAttr(node, 'data-skeleton-ignore') || node.tagName === 'STYLE';
        if (ignore) return;

        // Preprocessing some styles
        beforeHandler(node, this.options);

        // Preprocessing pseudo-class style
        pseudoHandler(node, this.options);

        const tagName = node.tagName && node.tagName.toUpperCase();
        const isBtn = tagName && (tagName === 'BUTTON' || /(btn)|(button)/g.test(node.getAttribute('class')));

        let isCompleted = false;
        switch (tagName) {
          case 'SCRIPT':
            scriptHandler(node);
            break;
          case 'IMG':
            imgHandler(node);
            break;
          case 'SVG':
            svgHandler(node);
            break;
          case 'INPUT':
          case 'TEXTAREA':
            inputHandler(node);
            break;
          case 'BUTTON': // Button processing ends once
            buttonHandler(node);
            break;
          case 'UL':
          case 'OL':
          case 'DL':
            listHandler(node, this.options);
            break;
          case 'A': // A label processing is placed behind to prevent IMG from displaying an exception
            aHandler(node);
            break;
        }

        if (isBtn) {
          // Handle button styles, end directly after processing
          buttonHandler(node);
        } else {
          // Other nodes are processed as TEXT
          isCompleted = this.handleText(node);
        }

        // If it is a button and has not been processed by handleText, then the child node is processed
        if (!isBtn && !isCompleted) {
          this.handleNodes(node.childNodes);
        }
      },
    };

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      switch (request.command) {
        case 'START':
          EasySkeleton.genSkeleton(request.options || {});
          sendResponse(true);
          break;
      }
    });

}());
