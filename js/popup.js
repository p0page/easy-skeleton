import {
  request,
  getSkeletonInjectContent,
  getSkeletonMap,
} from './util';

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
