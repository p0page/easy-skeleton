const sendMessageToContentScript = (message, callback) => {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
			if(callback) callback(response);
		});
	});
}

const sleep = (delay = 1000) => new Promise(r => setTimeout(r, delay))

const removeElement = ele => {
  const parent = ele.parentNode;
  if (parent) {
    parent.removeChild(ele);
  }
};

// const handleCaptureScreen = () => {
//   return new Promise(resolve => {
//     chrome.tabs.captureVisibleTab(null, {
//       format : "png",
//       quality : 100,
//     }, (data) => {
//       resolve(data);
//     });
//   })
// }

document.addEventListener("DOMContentLoaded", () => {
  const genBtn = document.querySelector('#gen-btn');
  if (genBtn) {
    genBtn.addEventListener('click', async () => {
      sendMessageToContentScript({ command: 'START', options: {} });
      // handleCaptureScreen().then((src) => {
      //   const img = document.createElement('div');
      //   img.innerText = src;
      //   document.body.append = img;
      // })
      // genBtn.setAttribute('disabled', '');
      // await sleep();
      // removeElement(genBtn);

    });
  }
  
});