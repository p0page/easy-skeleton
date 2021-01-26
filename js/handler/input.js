const inputHandler = (node) => {
  node.removeAttribute('placeholder');
  node.value = '';
};

export default inputHandler;
