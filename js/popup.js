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
    chrome.tabs.sendMessage(tab[0].id, message, (response) => {
			if(callback) callback(response);
		});
  })
}

// const genSkeletonInfo = async () => {
//   const tab = await queryCurrentTab();
//   if (tab && tab.url) {
//     try {
//       const html = await request({
//         url: tab.url,
//         responseType: 'text',
//       });
//       const injectContent = getSkeletonInjectContent(html);
//       const skeletonMap = getSkeletonMap(injectContent);
//       console.log(skeletonMap)
//     } catch(e) {
//       console.log(e);
//     }
//   }
// }

document.addEventListener("DOMContentLoaded", () => {
  // genSkeletonInfo();

  const genBtn = document.querySelector('#gen-btn');
  if (genBtn) {
    genBtn.addEventListener('click', () => {
      sendMessageToContentScript({ command: 'START', options: {} });
    });
  }
});