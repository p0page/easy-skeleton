(function () {
  'use strict';

  // Skeleton main color

  const SKELETON_DIVIDER = '<!-- SKELETON -->';
  const SKELETON_CLASS = 'skeleton-remove-after-first-request';
  const SKELETON_MAP_PREFIX = `<script class="${SKELETON_CLASS}">\nwindow.__skeletonMap = `;
  const SKELETON_MAP_SUFFIX = '</script>';

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

  const skeletonRegExp = new RegExp(`${SKELETON_DIVIDER}([\\s\\S]*)${SKELETON_DIVIDER}`);

  const getSkeletonInjectContent = (val) => {
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

  const getSkeletonMap = (val) => {
    if (!val || typeof val !== 'string') return '';

    const regExp = new RegExp(
      `${SKELETON_MAP_PREFIX.replace('\n', '\\s*')}\\s*(\\{[\\s\\S]*\\})\\s*${SKELETON_MAP_SUFFIX}`,
    );

    let res = {};

    try {
      const tmp = regExp.exec(val);
      if (tmp) res = JSON.parse(tmp[1]);
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
        const injectContent = getSkeletonInjectContent(html);
        const skeletonMap = getSkeletonMap(injectContent);

        const chipList = Object.keys(skeletonMap).map((hash) => {
          const chip = document.createElement('div');
          chip.classList.add('chip');
          chip.textContent = hash;
          chip.style.cursor = 'pointer';
          chip.onclick = () => { chrome.tabs.create({ url: skeletonMap[hash] }); };
          return chip;
        });

        console.log(chipList);
        if (chipList.length) {
          // const chipContainerEle = new DOMParser().parseFromString(chipContainer, 'text/html');
          const chipContainerEle = document.createElement('div');
          chipContainerEle.classList.add('chip-container');
          chipContainerEle.innerHTML = '<p class="chip-container-title">已接入的骨架屏</p>';
          chipList.forEach((chip) => {
            chipContainerEle.appendChild(chip);
          });
          // console.log(chipContainerEle);
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
