const hanldeRequest = ({
  url,
  data,
  method = 'GET',
  headers = {},
  responseType = 'json',
  ...rest
}) => fetch(url, {
  ...rest,
  method,
  headers: responseType === 'json' ? { 'Content-Type': 'application/json', ...headers } : headers,
  body: data && JSON.stringify(data),
}).then(res => ['json', 'text', 'formData', 'blob', 'arrayBuffer'].includes(responseType) ? res[responseType]() : res.text());

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

// const handleUpload = ({ img }) => {
//   if (img) {
//     return request('http://localhost:9006/upload/skeleton', {
//       method: 'POST',
//       data: {
//         img,
//       },
//     });
//   }

//   return Promise.reject(new Error('缺少参数'));
// }

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.command) {
    case 'CAPTURE':
      handleCapture().then(sendResponse);
      return true;
    case 'REQUEST':
      const { options = {} } = request;
      hanldeRequest(options || {}).then(sendResponse);
      return true;
    default:
      break;
  }
});
