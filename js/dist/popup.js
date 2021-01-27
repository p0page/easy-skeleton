(function () {
  'use strict';

  // Skeleton main color
  const SKELETON_CLASS = 'skeleton-remove-after-first-request';
  const SKELETON_MAP_CLASS = 'skeleton-map-remove-after-first-request';
  const SKELETON_MAP_SUFFIX = '</script>';

  const SKELETON_MAP_REGEXP = new RegExp(
    `<script class="?${SKELETON_CLASS}\\s*?(?:${SKELETON_MAP_CLASS})?"?>([\\s\\S]*?window.__skeletonMap\\s*?=[\\s\\S]*?)${SKELETON_MAP_SUFFIX}`,
  );

  const request = ({
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
  }).then((res) => (['json', 'text', 'formData', 'blob', 'arrayBuffer'].includes(responseType)
    ? res[responseType]()
    : res.text()));

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

  const queryCurrentTab = () => new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0]);
    });
  });

  const sendMessageToContentScript = (message, callback) => {
    queryCurrentTab().then((tab) => {
      chrome.tabs.sendMessage(tab.id, message, (response) => {
        if (callback) callback(response);
      });
    });
  };

  const genSkeletonStatus = async () => {
    const tab = await queryCurrentTab();
    if (tab && tab.url) {
      try {
        const html = await request({
          url: tab.url,
          responseType: 'text',
        });
        const skeletonMap = getSkeletonMap(html);

        const chipList = Object.keys(skeletonMap).map((hash) => {
          const chip = document.createElement('div');
          chip.classList.add('chip');
          chip.textContent = hash;
          chip.style.cursor = 'pointer';
          chip.onclick = () => { chrome.tabs.create({ url: skeletonMap[hash] }); };
          return chip;
        });

        if (chipList.length) {
          // const chipContainerEle = new DOMParser().parseFromString(chipContainer, 'text/html');
          const chipContainerEle = document.createElement('div');
          chipContainerEle.classList.add('chip-container');
          chipContainerEle.innerHTML = '<p class="chip-container-title">已接入的骨架屏</p>';
          chipList.forEach((chip) => {
            chipContainerEle.appendChild(chip);
          });
          document.body.appendChild(chipContainerEle);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    const genBtn = document.querySelector('#gen-btn');
    if (genBtn) {
      genBtn.addEventListener('click', () => {
        sendMessageToContentScript({ command: 'START', options: {} });
      });
    }

    // 显示目前已接入的骨架屏情况
    genSkeletonStatus();
  });

}());
