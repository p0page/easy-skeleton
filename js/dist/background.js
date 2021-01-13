(function () {
  'use strict';

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
  }).then(res => ['json', 'text', 'formData', 'blob', 'arrayBuffer'].includes(responseType) ? res[responseType]() : res.text());

  const capture = () => {
    return new Promise(resolve => {
      chrome.tabs.captureVisibleTab(null, {
        format: 'png',
        quality: 100,
      }, dataUrl => {
        resolve(dataUrl);
      });
    })
  };

  chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
    switch (req.command) {
      case 'CAPTURE':
        capture().then(sendRes);
        return true;
      case 'REQUEST':
        const { options = {} } = req;
        request(options || {}).then(sendRes);
        return true;
    }
  });

}());
