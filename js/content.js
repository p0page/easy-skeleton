import * as clipboard from "clipboard-polyfill/text";
import {
  sleep,
  hasAttr,
  inViewPort,
  removeElement,
  createElement,
  replaceElement,
  insertSkeleton,
  getSkeletonInjectContent,
  getSkeletonMap,
} from './util';
import {
  SKELETON_TEXT_CLASS,
} from './constants';
import * as handler from './handler/index';

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
        command: 'CAPTURE'
      }, (res) => {
        clearTimeout(timer);
        resolve(res);
      });
    });
  },

  request(options) {
    return new Promise((resolve, reject) => {
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

    if (newVal === this.isPreview) return;

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

    this.previewBtn = buttons[0];
    this.cancelBtn = buttons[1];
    this.submitBtn = buttons[2];

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
      const imgBase64 = await this.captureScreen();

      let originalHtml;
      try {
        originalHtml = await this.request({
          url: window.location.href,
          responseType: 'text',
        });
      } catch(e) {
        console.error('==genSkeleton Error==\n', e);
        alert('获取当前网页源码失败，将无法自动获取已经接入的骨架屏信息，请手动进行处理')
      }
      const injectContent = getSkeletonInjectContent(originalHtml);
      const originalSkeletonMap = getSkeletonMap(injectContent);
      const { html } = insertSkeleton(window.location.hash, imgBase64, originalSkeletonMap);

      this.toggleView(false);
      clipboard.writeText(html).then(() => {
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

    Array.from(node.childNodes || []).forEach(node => {
      this.removeScript(node);
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
    handler.style();
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
      handler.text(node, this.options);
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
          handler.text(tmpNode, this.options);
          return true;
        }
      }
    }

    // Processing <span>111<a>222</a></span> <span>111<img src="xx" /></span>
    if (tagName === 'SPAN' && node.innerHTML) {
      // Process image and background image first
      this.handleImages(node.childNodes);

      handler.text(node, this.options);
      return true;
    }

    return false;
  },

  // The text nodes are processed uniformly, and the background image, IMG, SVG, etc. need to be processed again.
  handleImages(nodes) {
    if (!nodes) return;

    Array.from(nodes).forEach(node => {
      if (hasAttr(node, 'data-skeleton-ignore')) return;

      handler.before(node, this.options);
      handler.pseudo(node, this.options);
      const tagName = node.tagName && node.tagName.toUpperCase();
      if (tagName === 'IMG') {
        handler.img(node);
      } else if (tagName === 'SVG') {
        handler.svg(node);
      } else {
        this.handleImages(node.childNodes);
      }
    });
  },

  // Processing node list
  handleNodes(nodes) {
    if (!nodes.length) return;

    Array.from(nodes).forEach(node => {
      this.handleNode(node);
    });
  },

  // Processing a single node
  handleNode(node) {
    if (!node) return;

    // Delete elements that are not in first screen, or marked for deletion
    if (!inViewPort(node) || hasAttr(node, 'data-skeleton-remove')) {
      return removeElement(node);
    }

    // Handling elements that are ignored by user tags -> End
    const ignore = hasAttr(node, 'data-skeleton-ignore') || node.tagName === 'STYLE';
    if (ignore) return;

    // Preprocessing some styles
    handler.before(node, this.options);

    // Preprocessing pseudo-class style
    handler.pseudo(node, this.options);

    const tagName = node.tagName && node.tagName.toUpperCase();
    const isBtn = tagName && (tagName === 'BUTTON' || /(btn)|(button)/g.test(node.getAttribute('class')));

    let isCompleted = false;
    switch (tagName) {
      case 'SCRIPT':
        handler.script(node);
        break;
      case 'IMG':
        handler.img(node);
        break;
      case 'SVG':
        handler.svg(node);
        break;
      case 'INPUT':
      case 'TEXTAREA':
        handler.input(node);
        break;
      case 'BUTTON': // Button processing ends once
        handler.button(node);
        break;
      case 'UL':
      case 'OL':
      case 'DL':
        handler.list(node, this.options);
        break;
      case 'A': // A label processing is placed behind to prevent IMG from displaying an exception
        handler.a(node);
        break;
      default:
        break;
    }

    if (isBtn) {
      // Handle button styles, end directly after processing
      handler.button(node);
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
      EasySkeleton.genSkeleton(request.options || {})
	    sendResponse(true);
      break;
    default:
      break;
  }
});