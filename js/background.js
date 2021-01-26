import { request } from './util';

const capture = () => new Promise((resolve) => {
  chrome.tabs.captureVisibleTab(null, {
    format: 'png',
    quality: 100,
  }, (dataUrl) => {
    resolve(dataUrl);
  });
});

chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
  switch (req.command) {
    case 'CAPTURE':
      capture().then(sendRes);
      return true;
    case 'REQUEST':
      request((req && req.options) || {}).then(sendRes);
      return true;
    default:
      break;
  }
  return false;
});
