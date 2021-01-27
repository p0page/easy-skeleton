(function () {
  'use strict';

  // Skeleton main color
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

  const skeletonMapRegExp = new RegExp(
    `${SKELETON_MAP_PREFIX.replace(/\s/g, '\\s*').replace(/"/g, '"?')}\\s*(\\{[\\s\\S]*\\})\\s*${SKELETON_MAP_SUFFIX}`,
  );

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
    }
    return false;
  });

}());
