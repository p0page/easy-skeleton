import {
  request,
  getSkeletonInjectContent,
  getSkeletonMap,
} from './util';

const queryCurrentTab = () => {
  return new Promise(resolve => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      resolve(tabs[0]);
    });
  });
}

const sendMessageToContentScript = (message, callback) => {
  queryCurrentTab().then(tab => {
    chrome.tabs.sendMessage(tab.id, message, (response) => {
			if(callback) callback(response);
		});
  })
}

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

      Object.keys(skeletonMap).map(item => {

      });
    } catch(e) {
      console.log(e);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const genBtn = document.querySelector('#gen-btn');
  if (genBtn) {
    genBtn.addEventListener('click', () => {
      sendMessageToContentScript({ command: 'START', options: {} });
    });
  }

  // 显示目前已接入的骨架屏情况
  genSkeletonStatus();
});