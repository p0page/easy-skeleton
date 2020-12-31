const request = (url, {
  data,
  method = 'POST',
  headers = {},
  ...rest
}) => fetch(url, {
  ...rest,
  method,
  headers: { 'Content-Type': 'application/json', ...headers },
  body: JSON.stringify(data),
}).then(res => res.json());

const handleCapture = () => {
  return new Promise(resolve => {
    chrome.tabs.captureVisibleTab(null, {
      format: 'png',
      quality: 100,
    }, dataUrl => {
      resolve(dataUrl);
    });
  })
}

const handleUpload = ({ img }) => {
  if (img) {
    return request('http://localhost:9006/upload/skeleton', {
      method: 'POST',
      data: {
        img,
      },
    });
  }

  return Promise.reject(new Error('缺少参数'));
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.command) {
    case 'CAPTURE':
      handleCapture().then(sendResponse);
      return true;
    case 'UPLOAD':
      handleUpload(request.data || {}).then(sendResponse);
      return true;
    default:
      break;
  }
});
