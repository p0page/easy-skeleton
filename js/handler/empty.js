const emptyHandler = (node) => {
  node.innerHTML = '';

  let classNameArr = node.className && node.className.split(' ');
  classNameArr = classNameArr.map((item) => `.${item}`);
  const className = classNameArr.join('');
  const id = node.id ? `#${node.id}` : '';
  const query = className || id;

  if (!query) return;

  let styleSheet;

  // eslint-disable-next-line no-restricted-syntax
  for (const item of document.styleSheets) {
    if (!item.href) {
      styleSheet = item;
      return;
    }
  }

  try {
    if (styleSheet) {
      styleSheet.insertRule(`${query}::before{content:'' !important;background:none !important;}`, 0);
      styleSheet.insertRule(`${query}::after{content:'' !important;background:none !important;}`, 0);
    }
  } catch (e) {
    console.log('handleEmptyNode Error: ', JSON.stringify(e));
  }
};

export default emptyHandler;
